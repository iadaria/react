import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions, // private readonly configService: ConfigService,
  ) {}

  async sendEmail(subjet: string, template: string, emailVars: EmailVar[]) {
    const form = new FormData();
    //console.log(form);
    form.append('from', `Nico form Nuber <mailgun@${this.options.domain}>`);
    //form.append('to', this.options.fromEmail); // add card for all email but at now is limit
    form.append('to', 'iakim.daria@gmail.com');
    form.append('subject', subjet);
    form.append('text', 'Testing');
    //form.append('template', 'verify-meail');
    form.append('template', template);
    //form.append('v:code', '34234lkjlkj');
    //form.append('v:username', 'jakimova');
    //console.log(form);
    emailVars.forEach((eVar) => form.append(eVar.key, eVar.value));

    try {
      const response = await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
        },
        body: form,
      });
      //console.log('******** ', response.body);
      return true;
    } catch (error) {
      //console.log(error);
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-meail', [
      { key: 'v:code', value: code },
      { key: 'v:username', value: email },
    ]);
  }
}
