// classe que vai conter a lógica dos dados
export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    // FETCH -> responsável por buscar os dados através da URL passada
    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers,
      }));
  }
}

// classe que define como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

    GithubUser.search("humbertogaldino").then((user) => console.log(user));
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];

    console.log(this.entries);
  }

  delete(user) {
    // Higher-order functions
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
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

      // utiliza-se onclick() quando não será utilizado,
      // em nenhum outro momento da aplicação o evento
      // de click para essa tag selecionada
      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?");

        if (isOk) {
          this.delete(user);
        }
      };

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
