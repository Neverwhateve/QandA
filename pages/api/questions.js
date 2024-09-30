export default function handler(req, res) {
  // 这里应该连接到你的数据库并获取问题
  // 现在我们只返回一些模拟数据
  res.status(200).json([
    { id: 1, title: '问题1', content: '这是问题1的内容' },
    { id: 2, title: '问题2', content: '这是问题2的内容' },
  ]);
}