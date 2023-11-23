const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const slugify = require('slugify');

// function rotte

async function index(req, res, next) {
    try {
      const where = {};
      const { page = 1, limit = 10, published, search } = req.query;
  
      // Filtro per post pubblicati
      if (published) {
        where.published = published === "true";
      }
  
      // Filtro per ricerca nel titolo o nel contenuto
      if (search) {
        where.OR = [
          { title: { contains: search} },
          { content: { contains: search} },
        ];
      }
  
      // Query per ottenere il numero totale di post
      const totalItems = await prisma.post.count({ where });
  
      // Calcola il numero totale di pagine disponibili
      const totalPages = Math.ceil(totalItems / limit);
  
      // Calcola l'offset in base alla pagina e al limite
      const offset = (page - 1) * limit;
  
      // Recupera i post in base ai filtri
      const posts = await prisma.post.findMany({
        where,
        take: parseInt(limit),
        skip: offset,
      });
  
      res.json({
        posts,
        totalPages,
        currentPage: parseInt(page),
        totalItems,
      });
    } catch (error) {
      // Gestisci gli errori in modo adeguato
      next(error);
    }
  }
  
  

async function show(req, res) {
  // Estraggo lo slug dai parametri della richiesta
  const { slug } = req.params;

  // Cerco il post utilizzando lo slug, generando uno slug pulito con slugify
  const post = await prisma.post.findUnique({
    where: {
      slug: slugify(slug, { lower: true, replacement: '-' }),
    },
  });

  // Se il post non esiste, lancio un errore
  if (!post) {
    throw new Error("Il post non è stato trovato");
  }

  // Ritorno il post come risposta JSON
  return res.json(post);
}


async function store(req, res) {
  // Genero uno slug utilizzando la libreria slugify
  const slug = slugify(req.body.title, { lower: true, replacement: '-' });

  // Creo un nuovo post utilizzando i dati dalla richiesta
  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      slug: slug,
      image: req.body.image,
      content: req.body.content,
      published: req.body.published,
    },
    // skipDuplicates: true,
  });

  // Ritorno il nuovo post come risposta JSON
  res.json(newPost);
}


async function update(req, res) {
  // Estraggo lo slug dai parametri della richiesta
  const { slug } = req.params;

  // Genero uno slug basato sul nuovo titolo della richiesta
  const newSlug = slugify(req.body.title, { lower: true, replacement: '-' });

  // Aggiorno il post utilizzando lo slug originale, aggiornando anche lo slug
  const post = await prisma.post.update({
    where: {
      slug: slugify(slug, { lower: true, replacement: '-' }),
    },
    data: {
      title: req.body.title,
      slug: newSlug,
      image: req.body.image,
      content: req.body.content,
      published: req.body.published,
    },
  });

  // Ritorno il post aggiornato come risposta JSON
  res.json(post);
}


async function destroy(req, res) {
  // Estraggo lo slug dai parametri della richiesta
  const { slug } = req.params;

  // Elimino il post utilizzando lo slug
  await prisma.post.delete({
    where: {
      slug: slugify(slug, { lower: true, replacement: '-' }),
    },
  });

  // Ritorno un messaggio di conferma come risposta JSON
  res.json({ message: "Il post è stato eliminato" });
}








module.exports={
    index,
    show,
    store,
    update,
    destroy
}