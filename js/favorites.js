// classe que vai conter a lógica dos dados
// classe que define como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = [
      {
        login: "humbertogaldino",
        name: "Humberto Galdino",
        public_repos: "60",
        followers: "47",
      },
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "76",
        followers: "12000",
      },
      {
        login: "diego3g",
        name: "Diego Fernandes",
        public_repos: "76",
        followers: "12000",
      },
    ];
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;

      row.querySelector(".user img").alt = `Imagem de ${user.name}`;

      row.querySelector(".user a").href = `https://github.com/${user.login}`;

      row.querySelector(".user a p").textContent = user.name;

      row.querySelector(".user span").textContent = user.login;

      row.querySelector(".repositories").textContent = user.public_repos;

      row.querySelector(".followers").textContent = user.followers;

      // .append() é uma funcionalidade da DOM
      // que recebe como parâmetro o elemento HTML
      // criado pela DOM
      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="user">
        <img
          src="https://github.com/HumbertoGaldino.png"
          alt="Imagem de HumbertoGaldino"
        />

        <a
          href="https://github.com/HumbertoGaldino"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Humberto Galdino</p>
          <span>HumbertoGaldino</span>
        </a>
        
        </td>

        <td class="repositories">60</td>
        <td class="followers">47</td>
        <td>
          <button class="remove">&times;</button>
        </td>
    `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
