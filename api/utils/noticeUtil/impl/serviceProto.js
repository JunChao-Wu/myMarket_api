"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProto = void 0;
exports.serviceProto = {
  "version": 1,
  "services": [
    {
      "id": 0,
      "name": "Chat",
      "type": "msg",
    },
    {
      "id": 1,
      "name": "Send",
      "type": "api",
    },
  ],
  "types": {
    "MsgChat/MsgChat": {
      "type": "Interface",
      "properties": [
        {
          "id": 0,
          "name": "content",
          "type": {
            "type": "String",
          },
        },
        {
          "id": 1,
          "name": "time",
          "type": {
            "type": "Date",
          },
        },
      ],
    },
    "PtlSend/ReqSend": {
      "type": "Interface",
      "properties": [
        {
          "id": 0,
          "name": "content",
          "type": {
            "type": "String",
          },
        },
      ],
    },
    "PtlSend/ResSend": {
      "type": "Interface",
      "properties": [
        {
          "id": 0,
          "name": "time",
          "type": {
            "type": "String",
          },
        },
      ],
    },
  },
};

