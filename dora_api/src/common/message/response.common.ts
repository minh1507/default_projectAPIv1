export function responseAPISucess(req: any) {
  return {
    success: {
      value: req.data,
      msg: req.mes,
    },
  };
}

export function responseAPIFailed(req: any) {
  return {
    errors: [
      {
        value: req.data,
        msg: req.mes,
      },
    ],
  };
}
