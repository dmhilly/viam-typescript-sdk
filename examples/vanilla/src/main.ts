import { type DialOptions } from '@viamrobotics/rpc/src/dial';
import * as VIAM from '@viamrobotics/sdk';

async function connect(): Promise<VIAM.ViamClient> {
  const credential = {
    payload: '<API-KEY>',
    type: 'api-key',
  };

  const dialOpts: DialOptions = {
    authEntity: '<API-KEY-ID>',
    credentials: credential,
  };

  const client = new VIAM.ViamClient(dialOpts);
  await client.connect();

  return client;
}

const button = <HTMLButtonElement>document.getElementById('main-button');

async function run(client: VIAM.ViamClient) {
  // A filter is an optional tool to filter out which data comes back.
  const opts: VIAM.FilterOptions = { componentType: 'camera' };
  const filter = client.dataClient.createFilter(opts);

  try {
    button.disabled = true;
    const textElement = <HTMLParagraphElement>document.getElementById('text');
    textElement.innerHTML = 'waiting for data...';

    const dataList = await client.dataClient.tabularDataByFilter(filter);
    textElement.innerHTML = JSON.stringify(dataList, null, 2);
  } finally {
    button.disabled = false;
  }
}

async function main() {
    // Hardcoded percentage for time spent standing (example)
    const percentageStanding = 75;
       
    // Get and display the current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').innerHTML = `${currentDate.toLocaleDateString('en-US', options)}`;

    // Display the percentage on the webpage
    document.getElementById('standingPercentage').innerHTML = `You have spent ${percentageStanding}% of your time standing today.`;
}

main();
