module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true,
  });

  router.post('/', async (req, res) => {
    // 创建资源
    const model = await req.Model.create(req.body);
    res.send({
      code: 200,
      data: model,
    });
  });

  router.put('/:id', async (req, res) => {
    // 更新资源
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      code:200,
      data:model
    });
  });

  router.delete('/:id', async (req, res) => {
    // 删除资源
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      code:200,
      success: true,
    });
  });

  router.get('/', async (req, res) => {
    const queryOptions = {};

    if (req.Model.modelName == 'Article' || req.Model.modelName == 'Good') {
      queryOptions.populate = 'parent';
    }

    const page = req.params.page || 0;
    const list = await req.Model.find()
      .skip(page * 20)
      .limit(20)
      .setOptions(queryOptions);
    const total = await req.Model.find().countDocuments();
    const data = {
      list,
      total,
      current_page: page + 1,
      last_page: Math.ceil(total / 20),
    };
    res.send({
      code: 200,
      data
    });
  });

  router.get('/:id', async (req, res) => {
    // 获取详情

    const data = await req.Model.findById(req.params.id);

    res.send({ data: data });
  });

  const auth = require('../../middleware/auth'); // 登陆效验

  const resource = require('../../middleware/resource'); // 根据路由传参寻找对应 models

  app.use('/admin/api/rest/:resource', auth(), resource(), router);

  const multer = require('multer');

  const uploads = multer({ dest: __dirname + '/../../uploads' });

  app.use(
    '/admin/api/upload',
    auth(),
    uploads.single('file'),
    async (req, res) => {
      
      const file = req.file;

      const suffix = file.originalname.split('.').pop() || '';

      let url = '';

      if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        url = `http://localhost:3000/uploads/images/${file.filename}.${suffix}`
      }else {
        url = `http://localhost:3000/uploads/${file.filename}.${suffix}`;
      }
      res.send({
        url,
      });
    }
  );

  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
