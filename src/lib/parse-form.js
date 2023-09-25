// import { NextApiRequest } from 'next';
import mime from 'mime';
import { join } from 'path';
import * as dateFn from 'date-fns';
import { mkdir, stat } from 'fs/promises';
import { formidable, FormidableError } from 'formidable';

export { FormidableError };

export const parseForm = async (req) => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`
    );

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || 'unknown'}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || '') || 'unknown'
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === 'media' && (part.mimetype?.includes('image') || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
