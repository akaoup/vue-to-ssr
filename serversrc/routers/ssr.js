const Router = require('koa-router')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')

const serverRender = require('./server-render.js')

// json文件在node里可以作为模块require
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const renderer = VueServerRenderer.createBundleRenderer(
	path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
	{
		inject: false,
		clientManifest
	}
)

const template = fs.readFileSync(
	path.join(__dirname, '../server.template.ejs'),
	'utf-8'
)
const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
	await serverRender(ctx, renderer, template)
})

module.exports = pageRouter