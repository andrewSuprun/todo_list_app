const Router = require('express');
const router = new Router();
const tasks = require("../controller/todoConroller.js");

router.post("/", tasks.create);

router.get("/", tasks.getAll);

router.get("/todo/:id", tasks.getOne);

router.put("/todo/:id", tasks.update);

router.delete("/todo/:id", tasks.delete);

router.patch("/todo/:id", tasks.markAsCompleted);


module.exports = router