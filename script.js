//home page

//variables

const endpoint = "https://striveschool-api.herokuapp.com/api/movies/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZjA2YjRiY2RlMTAwMTc2MTZiYWEiLCJpYXQiOjE2MDUxMDM3MjMsImV4cCI6MTYwNjMxMzMyM30.UbKj_OMFcs4waSUNmvcnsQaJjquuaUrJLDBzVVcL-dE"

//global objects

const get_genres = async () => {
  //await return all movies in a json
  //make an object
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
      //return genres;
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
// const check_categories = async () => {
//   //create another object with key values
//   //pass them on to render
// }

// const render_categories = async () => {
//   //render rows with template literals after passing a categories object and assign genre ids
//   console.log(genres)
// }
// render_categories()

const render_movies = async () => {
  //get movies from get_genres and then render them according to the genre
}

get_genres()

//BACKOFFICE
//read form, then send data to endpoint with post

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
        //location.assign("index.html")
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      alert(error)
    }
  }
}

//load_backoffice()

//MOVIES MANAGER

const render_list = async () => {
  console.log("render_list called")
  //   let listed = document.querySelector("#listed")

  try {
    let all_genres = await get_genres()
    console.log(all_genres)
    if (all_genres.length > 0) {
      //   let all_movies = []
      let movies = []

      console.log(all_movies)
      let all_movies = await all_genres.forEach(async genre => {
        movies = await get_movies_by_genre(genre)
        all_movies.push(movies)
      })

      let all = [].concat(...all_movies)

      console.log(all)
    } else {
      console.log("THERE ARE NO GENRES")
    }
  } catch (error) {
    console.log(error)
  }
}

// window.onload = () => {ß
//   if (window.location.href.indexOf("movies-manager") != -1) {
//   }
// }
render_list()
get_movies_by_genre("Drama")
const delete_movie = () => {}
