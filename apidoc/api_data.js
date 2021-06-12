define({ "api": [
  {
    "type": "get",
    "url": "/login/getInfo",
    "title": "获取用户数据0",
    "description": "<p>获取用户数据</p>",
    "name": "getInfo",
    "group": "login",
    "version": "1.0.0",
    "filename": "app/game/api/LoginApi.ts",
    "groupTitle": "login"
  },
  {
    "type": "POST",
    "url": "/user/create",
    "title": "创建用户",
    "description": "<p>创建用户</p>",
    "name": "create",
    "group": "user",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "access-key",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "head",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sex",
            "description": "<p>性别</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>{code:number}</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>0.设置成功</p>"
          }
        ]
      }
    },
    "filename": "app/game/api/UserApi.ts",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/user/setName",
    "title": "设置名称",
    "description": "<p>设置用户名称</p>",
    "name": "setName",
    "group": "user",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "access-key",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>用户名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>{code:number}</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>0.设置成功</p>"
          }
        ]
      }
    },
    "filename": "app/game/api/UserApi.ts",
    "groupTitle": "user"
  }
] });
