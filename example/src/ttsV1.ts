import { NextFunction, Request, Response } from 'express';
import * as PlayHTAPI from '../../dist/index';

async function ttsV1(req: Request, res: Response, next: NextFunction) {
  if (!req.body?.text) {
    res.status(400).send('Text to generate not provided');
    return next();
  }

  const text = req.body.text;

  res.set('Content-Type', 'application/json');
  try {
    // Call the API
    const generated = await PlayHTAPI.genereateStandardOrPremiumSpeech([text], 'en-US-NancyNeural');

    res.status(200).json(generated);
  } catch (error: any) {
    res.statusMessage = error?.message;
    res.status(error?.status || 500).send();
  }
  next();
}

export default ttsV1;
