import formidable from 'formidable'
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false
  }
}

const readFile = (req: any, saveLocally?: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {}
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public/pdfs')
    options.filename = (name, ext, path) => {
      return Date.now().toString() + '_' + path.originalFilename
    }
  }
  options.maxFileSize = 4000 * 1024 * 1024
  const form = formidable(options)

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const handler: any = async (req: any, res: any) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/public', '/pdfs'))
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/public', '/pdfs'))
  }
  const result = await readFile(req, true)
  res.json({ done: result.files.pdf })
}

export default handler
