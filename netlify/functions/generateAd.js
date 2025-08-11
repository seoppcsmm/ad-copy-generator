export async function handler(event) {
  try {
    const { product, audience, tone } = JSON.parse(event.body);

    const prompt = `Create a ${tone} advertisement for:
    Product: ${product}
    Target audience: ${audience}
    Provide:
    1. Headline
    2. Description
    3. Call-to-Action`;

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await apiRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ output: data.choices?.[0]?.message?.content || "No response" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
