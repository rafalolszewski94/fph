import {Command} from '@oclif/command'
import {cli} from 'cli-ux'
import * as chalk from 'chalk'
import * as rp from 'request-promise'
import * as cheerio from 'cheerio'

const url = 'https://www.producthunt.com'

class FPH extends Command {
  static description = 'Use `fph` to fetch and display latest trends on Product Hunt'

  static flags = {
    ...cli.table.flags(),
  }

  async run() {
    cli.action.start('Fetching latest trends from Product Hunt...', '', {stdout: true})

    const {flags} = this.parse(FPH)

    await rp(url).then((html: any) => {
      cli.action.stop(chalk.bold.green('done ✔'))
      const posts: any[] = []
      const $ = cheerio.load(html)
      const postsList = $('#app ul[class*=postsList] > li')

      postsList.each((i, el) => {
        const link = $(el).find('a[class*=link][href*="/posts/"]').attr('href')
        const vote = $(el).find('div[class*=voteButtonWrap]').text()
        if (link) {
          posts.push({
            link: `${url}${link}`,
            votes: vote,
          })
        }
      })

      cli.table(posts, {
        link: {
          minWidth: 7,
        },
        votes: {},
      }, {
        printLine: this.log,
        ...flags,
      })
    }).catch((error: string | Error) =>
      this.error(error))
  }
}

export {run} from '@oclif/command'
module.exports = FPH
