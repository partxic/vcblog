# vcblog

在 Cloudflare Worker 上运行的全栈博客

## 部署步骤

1. 打开 wrangler.jsonc 修改

```jsonc
    "kv_namespaces": [
        {
            "binding": "config",
            "id": "<KV 存储库 ID>",
            "remote": true
        }
    ],
    "d1_databases": [
        {
            "binding": "storage",
            "database_name": "vcblog-storage",
            "database_id": "<D1 数据库 ID>",
            "remote": true
        }
    ]
```

2. 打开 init-storage.sql 并在 D1 中执行

3. 在 KV 中添加
    - extraCSS 留空
    - extraJS 留空
    - jwtSecret 去 https://tools.nodeauth.io/ 生成一个随机密钥填进去
    - password 自定义一个密码
    - postPerPage 默认填 10 除非有特别需求
    - title 给站点起一个标题

4. 删除 vercel.json 和 web/public/google5e91cf388c3fb2ff.html

5. 在 worker 中部署
