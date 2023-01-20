const OPENAI_API_KEY = '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';

const {Configuration, OpenAIApi} = require('openai');

const main = async () => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: 'Hello world',
  });
  console.log(completion.data.choices[0].text);
};

main();
