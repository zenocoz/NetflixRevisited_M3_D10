const endpoint = "https://striveschool-api.herokuapp.com/api/movies/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZjA2YjRiY2RlMTAwMTc2MTZiYWEiLCJpYXQiOjE2MDUxMDM3MjMsImV4cCI6MTYwNjMxMzMyM30.UbKj_OMFcs4waSUNmvcnsQaJjquuaUrJLDBzVVcL-dE"

//Utility Functions

const get_genres = async () => {
  try {
    let response = await fetch(endpoint, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
    let genres = await response.json()
    console.log(genres)
    if (genres.length > 0) {
      return genres
    } else {
      console.log("There are no genres")
    }
  } catch (error) {
    alert(error)
  }
}

const get_movies_by_genre = async category => {
  try {
    let response = await fetch(endpoint + category, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
    let movies = await response.json()
    console.log(movies)
    console.log(`there are ${movies.length} movies of ${category} genre`)
    return movies
  } catch (error) {
    alert(error)
  }
}

const get_all_movies = async () => {
  try {
    let response = await fetch(endpoint, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
    let genres = await response.json()
    let all_movies = []
    for (let i = 0; i < genres.length; i++) {
      movies = await get_movies_by_genre(genres[i])
      all_movies.push(movies)
    }
    //TODO works with for loop but not with foreEach
    // all_genres.forEach(genre => {
    //     movie = await get_movies_by_genre(genre)
    //     all_movies.push(movie)
    // })
    let all_movies_flat = [].concat(...all_movies)
    console.log(all_movies_flat)
    return all_movies_flat
  } catch (error) {
    alert(error)
  }
}

const get_single_movie = async id => {
  let movies = await get_all_movies()
  if (movies) {
    let movie = movies.find(el => (el._id = id))
    console.log(movie)
    return movie
  }
}

//HOME PAGE

const render_movies = async () => {
  let frame = document.querySelector("#frame")
  let genres = await get_genres()

  genres.forEach(async genre => {
    let heading = document.createElement("h5")
    heading.classList.add("text-white")
    heading.innerText = `${genre}`
    let row = document.createElement("div")
    row.classList.add("row", "no-gutters", "flex-lg-nowrap", "mb-3")
    row.id = genre
    row.innerHTML = ""
    frame.appendChild(heading)
    frame.appendChild(row)
    let movies = await get_movies_by_genre(genre)
    movies.forEach(movie => {
      let col = document.createElement("div")
      col.classList.add(
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-2",
        "mr-2",
        "mb-2"
      )
      col.innerHTML = `<img class="img-fluid" src="${movie.imageUrl}" alt="" />`
      let row_genre = document.getElementById(`${genre}`)
      row_genre.appendChild(col)
    })
  })
}

//BACKOFFICE

const load_backoffice = () => {
  let form = document.querySelector("#form")
  form.addEventListener("submit", event => {
    handle_submit(event)
  })
  const handle_submit = event => {
    event.preventDefault()
    submit()
  }

  const submit = async () => {
    let movie = {
      name: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
      imageUrl: document.querySelector("#image").value,
    }
    try {
      let response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
      if (response.ok) {
        alert("MOVIE ENTERED SUCCESFULLY")
        const success = await response.json()
        console.log(success)
        location.reload()
        location.assign("index.html")
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      alert(error)
    }
  }
}

//MOVIES MANAGER
const render_list = async () => {
  let listed = document.querySelector("#listed")
  try {
    let all_movies = await get_all_movies()
    if (all_movies.length > 0) {
      all_movies.forEach(movie => {
        let li = document.createElement("li")
        li.classList.add("list-group-item", "d-flex", "justify-content-between")
        li.innerHTML = `<span>${movie.name}</span>
      <span>${movie.description}</span>
      <button type="button" class="btn btn-primary" id="${movie._id}">Update</span><span></button>
      <button  type="button" class="btn btn-danger"  id="${movie._id}">Delete</button><span>`
        listed.appendChild(li)
      })
      let delete_btns = document.querySelectorAll(".btn-danger")
      let update_btns = document.querySelectorAll(".btn-primary")
      delete_btns.forEach((btn, i) => {
        btn.onclick = function () {
          delete_movie(btn.id)
        }
        update_btns[i].onclick = function () {
          window.location.assign(`update.html?id=${btn.id}`)
        }
      })
    } else {
      console.log("THERE ARE NO MOVIES")
    }
  } catch (error) {
    console.log(error)
  }
}

const delete_movie = async id => {
  const deletion = await fetch(endpoint + id, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
  if (deletion.ok) {
    alert("Event deleted successfully")
    location.reload()
  }
}

//UPDATE PAGE-----------------

const load_update_page = async () => {
  let urlParams = new URLSearchParams(window.location.search)
  id = urlParams.get("id")

  if (id) {
    let movie = await get_single_movie(id)
    console.log(movie)
    document.querySelector("#name").value = movie.name
    document.querySelector("#description").value = movie.description
    document.querySelector("#category").value = movie.category
    document.querySelector("#image").value = movie.imageUrl
  }
  let form = document.querySelector("#form")
  form.addEventListener("submit", event => {
    handle_update(event)
  })
  const handle_update = event => {
    event.preventDefault()
    update()
  }
  const update = async () => {
    let movie = {
      name: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
      imageUrl: document.querySelector("#image").value,
    }
    try {
      let response = await fetch(endpoint + id, {
        method: "PUT",
        body: JSON.stringify(movie),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
      if (response.ok) {
        alert("MOVIE UPDATED SUCCESFULLY")
        const success = await response.json()
        console.log(success)
        location.reload()
        location.assign("index.html")
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      alert(error)
    }
  }
}

window.onload = () => {
  if (window.location.pathname === "/index.html") {
    render_movies()
  }

  if (window.location.pathname === "/movies_manager.html") {
    render_list()
  }
  if (window.location.pathname === "/backoffice.html") {
    load_backoffice()
  }
  if (window.location.pathname === "/update.html") {
    load_update_page()
  }
}
