// Source: https://github.com/vuejs/vitepress/issues/1737

const fs = require('fs')
const path = require('path')
const { resolve } = path

export const scanDir = pathName => {
	const path = resolve(__dirname, `../../${pathName}`)
	return getMsg(path)
}

export const getMsg = path => {
	let res = fs.readdirSync(path).filter(item => !(String(item) === 'index.md'))

	if (res) {
		let arr = res.map(item => {
			if (String(item).endsWith('.md')) {
				return {
					text: item.split('.')[0].replaceAll('-', ' '),
					link: resolve(path, item),
				}
			} else {
				return {
					text: item.split('.')[0],
					items: getMsg(resolve(path, item)),
					collapsible: true,
				}
			}
		})

		arr = arr.map(item => {
			if (item.link) {
				item.link = translateDir(item.link)
			}
			return item
		})

		return arr
	} else {
		console.warn('No posts.')
	}
}

/**
 *
 * @param {string} path
 * @returns
 */
function translateDir(path) {
	return path.replace(/\\/g, '/').split('docs')[1].split('.')[0]
}