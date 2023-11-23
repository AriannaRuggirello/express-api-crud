const express = require('express');
const router = express.Router();
const postsController=require('../controllers/posts');


// // definizione rotte
// //GET /posts per recuperare tutti i post presenti nel database, con la possibilità di filtrare per:
router.get('/', postsController.index);

//GET /posts/:slug per recuperare un post utilizzando il suo slug.
router.get('/:slug', postsController.show);

//POST /posts per creare un nuovo post.
router.post('/', postsController.store);

// PUT /posts/:slug per aggiornare un post.
router.put('/:slug', postsController.update);

//  DELETE /posts/:slug per eliminare un post.
router.delete('/:slug', postsController.destroy);

module.exports=router