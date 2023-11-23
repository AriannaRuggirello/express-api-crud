Esercizio


Iniziamo a creare le API per il nostro blog :occhiali_da_sole:. Iniziate con un nuovo progetto Express + Prisma. Potete utilizzare lo schema Prisma che avete creato nell’esercizio di ieri.Definizione degli endpoint
Vi chiediamo di definire i seguenti endpoint:

    POST /posts per creare un nuovo post.
    GET /posts/:slug per recuperare un post utilizzando il suo slug.
    GET /posts per recuperare tutti i post presenti nel database, con la possibilità di filtrare per:

        Post pubblicati.
        Post che contengono una determinata parola nel titolo o nel contenuto.

    PUT /posts/:slug per aggiornare un post.
    DELETE /posts/:slug per eliminare un post.