export default async function handler(req, res) {
  try {
    const token = process.env.VERCEL_ANALYTICS_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'VERCEL_ANALYTICS_TOKEN missing' });
    }

    const teamId = 'team_iwHnv1WqvicjDWpHTitBlmNn';
    const projectId = 'prj_HZ8Zbc6k7veuKwMZpwb3UC5gLfMa';

    const url = new URL('https://api.vercel.com/v1/query/web-analytics/visits/count');
    url.searchParams.set('teamId', teamId);
    url.searchParams.set('projectId', projectId);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Unknown error' });
  }
}
