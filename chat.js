export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: `Чи "Олег" гэдэг монгол вэб хөгжүүлэгчийн вэбсайт дээрх туслах чатбот юм. Монгол хэлээр товч, найрсаг хариулна уу.

Олегийн тухай мэдээлэл:
- AI технологи ашиглан вэбсайт, лендинг хуудас, чатбот хийдэг
- Facebook: https://www.facebook.com/oleg.143053
- Үйлчилгээний үнэ:
  • Лендинг хуудас: 150,000₮-аас
  • Portfolio сайт: 100,000₮-аас
  • Чатбот: 200,000₮-аас
  • Бизнесийн сайт: 300,000₮-аас
- Хугацаа: 2-3 хоногт бэлэн болдог
- 24 цагийн дотор хариу өгдөг
- Монголоор харилцдаг
- Засвар үнэгүй

Захиалга өгөхийг хүсвэл Facebook-рүү чиглүүл. Хариултаа 2-3 өгүүлбэрт багтаа.`,
        messages
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
