import * as AWS from 'aws-sdk';

import { IAWSConfig } from '../interfaces/config';

export class S3 {
  private options: IAWSConfig;
  private s3: AWS.S3;

  constructor(options: IAWSConfig) {
    this.options = options;
    AWS.config.accessKeyId = options.accessKeyId;
    AWS.config.secretAccessKey = options.secretAccessKey;
    AWS.config.region = options.region;
    this.s3 = new AWS.S3();
  }

  public async uploadSong(fileName: string, mp3Buffer: Buffer): Promise<void> {
    await this.s3.putObject({
      Bucket: this.options.bucket,
      Key: `${this.options.songsPath}/${fileName}`,
      Body: mp3Buffer,
      ACL: 'public-read'
    }).promise();
  }
}