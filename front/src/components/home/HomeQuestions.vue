<template>
  <h3 class="q-mb-none">Frequently asked Questions</h3>
  <div class="q-mb-xl">Read the answers to help you</div>

  <q-expansion-item
    header-class="text-bold"
    class="q-card--bordered overflow-hidden"
    icon="payments"
    label="Why should I pay for a document?"
  >
    <q-card class="q-pa-md">
      <p class="q-mb-md">
        Normalement, tout le monde a accès à tous les fichiers publiés sur ALANTARANJA.
        Pourtant, Il y a deux raisons inévitables pour lesquelles <mark class="q-px-md">on vous
        impose le frais de service</mark> pour certains documents
      </p>
      <q-item>
        <q-item-section avatar>
          <q-avatar
            size="sm"
            color="primary"
            text-color="white">1</q-avatar>
        </q-item-section>
        <q-item-section>Nous reglons l'hebergement ensemble.</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="sm" color="primary" text-color="white">2</q-avatar>
        </q-item-section>
        <q-item-section>Nous embauchons les agents travaillant sur la plateforme.</q-item-section>
      </q-item>
      <p class="q-mt-md">
        Donc, avant de pouvoir télécharger ou lire vos documents, il vous faudra le frais de service du site.
        <mark class="q-px-md">Certaines vidéos ne peuvent pas être téléchargés en raison de leur confidentialité</mark>.<br/>
        Les enseignants ne veulent peut-être pas d'éparpiller leurs vidéos partout.
        Donc vous devez simplement lire ces genres de documents une fois que vous y aviez accès.
      </p>
    </q-card>
  </q-expansion-item>

  <q-expansion-item
    header-class="text-bold"
    class="q-card--bordered overflow-hidden q-my-md"
    icon="mood"
    label="How would I get my document?"
  >
    <q-card class="q-pa-md">
      <p>Avant tout, vous devez <q-btn color="primary" no-caps flat to="/auth/login">vous connecter</q-btn> à votre
        compte ou <q-btn color="primary" no-caps flat to="/auth/login">en créez</q-btn> un si vous n'êtes pas inscrit.</p>
      <p>Allez dans le menu <b>« Achat »</b> et cherchez votre document,
        puis cliquez sur l'icone dans la colonne <b>Actions</b> pour
        le mettre dans le pannier.<br /> Vous pouvez cliquer sur la même
        position pour désélectionner le document choisi par erreur.</p>

      <q-card flat bordered class="q-pa-md">
        <q-img src="/purchase.png" />
      </q-card>
      <p class="q-mt-md">Finalement, allez dans le menu <b>« New »</b> pour valider votre commande.
        Envoyez votre paiment par Mobile Money avec le numéro choisi qui se trouve en haut.
        <br />Une fois que ça soit fait, entrez votre <mark class="q-px-md">capture de paiment</mark>
        et eventuellement vous pouvez saisir une briève note de description. </p>

      <p class="q-mt-md">Après avoir validé votre paiment, vous pouver allez dans la section <b>« List »</b>
        et voir le statut de paiement. <br />Nous traiterons votre demande le plus vite possible. Vous devez patienter.
        <br /><br />Quand votre demande est accordée, vous auré un statut <b>« Approuvé »</b>
        et des boutons vous permettant de voir ou télécharger vos documents.<br />
        <mark>Vous devez bien gardé vos documents téléchargés car le lien ne sera plus accessible qu'après un nouveau reglement.</mark>
      </p>
    </q-card>
  </q-expansion-item>

  <q-expansion-item
    header-class="text-bold"
    class="q-card--bordered overflow-hidden"
    icon="fact_check"
    label="What can I do once I have access to a document ?"
  >
    <q-card class="q-pa-md">
      <p class="q-mb-md">
        Lorsque vous avez accès à un document,
      </p>
      <q-item>
        <q-item-section avatar>
          <q-avatar
            size="sm"
            icon="comment"
            color="primary"
            text-color="white" />
        </q-item-section>
        <q-item-section>Vous pourrez participer à des dicussions concernant ce dernier.</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar
            size="sm"
            icon="subject"
            color="primary"
            text-color="white" />
        </q-item-section>
        <q-item-section>Vous aurez aussi le droit d'ouvrir un sujet de discussion par vous-même.</q-item-section>
      </q-item>
      <p class="q-mt-md">
        Cela vous permettra de vous mettre en relation avec celui qui a publié le document.
        C'est ce que vous aurez dans la section <b>« Forum »</b></p>
      <q-img src="/forum.png" />
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
