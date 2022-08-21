const Router = require('express')
const router = new Router()
const tasks = require("../controller/todoConroller.js");

router.post("/", tasks.create);

router.get("/", tasks.getAll);

router.get("/:id", tasks.getOne);

router.put("/:id", tasks.update);

router.delete("/:id", tasks.delete);

module.exports = router