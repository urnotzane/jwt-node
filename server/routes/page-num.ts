import { router } from './../index';

router.get("/page-num", (req, res) => {
  res.send({
    data: 10,
  });
});