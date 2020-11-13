//home page

//variables

const endpoint = "https://striveschool-api.herokuapp.com/api/movies/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZjA2YjRiY2RlMTAwMTc2MTZiYWEiLCJpYXQiOjE2MDUxMDM3MjMsImV4cCI6MTYwNjMxMzMyM30.UbKj_OMFcs4waSUNmvcnsQaJjquuaUrJLDBzVVcL-dE"

//global objects
const Movies = {
  // sci_fi : [],
  // drama : [],
}

const get_movies = async () => {
  //await return all movies in a json
  //make an object
  try {
    let response = await fetch(endpoint + "thriller", {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
    let movies = await response.json()
    console.log(movies)
    if (movies.length > 0) {
      console.log("there are movies")
      return movies
    } else {
      console.log("There are no movies")
    }
  } catch (error) {
    alert(error)
  }
}

const check_categories = async () => {
  //map list of movies based on first occurence of genre : value;
  //create another object with key values
  //pass them on to render
}

const render_categories = async () => {
  //render rows with template literals after passing a categories object and assign genre ids
}

const render_movies = async () => {
  //get movies from get_movies and then render them according to the genre
}

get_movies()

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

//ADD CATEGORIES

// const load_add_category = () => {
//   let form = document.querySelector("#form-add")
//   form.addEventListener("submit", event => {
//     handle_add(event)
//   })

//   const handle_add = event => {
//     event.preventDefault()
//     add()
//   }

//   const add = async () => {
//     let category = {
//       category: document.querySelector("#category").value,
//     }
//     try {
//       let response = await fetch(endpoint, {
//         method: "POST",
//         body: JSON.stringify(category),
//         headers: new Headers({
//           "Content-Type": "application/json",
//           Authorization: token,
//         }),
//       })
//       if (response.ok) {
//         alert("CATEGORY ENTERED SUCCESFULLY")
//         const success = await response.json()
//         console.log(success)
//         //location.assign("index.html")
//       } else {
//         const error = await response.json()
//         console.log(error)
//       }
//     } catch (error) {
//       alert(error)
//     }
//   }
// }

//MOVIES MANAGER

const render_list = async () => {
  console.log("render_list called")
  let listed = document.querySelector("#listed")
  let movies = await get_movies()
  movies.forEach(movie => {
    let li = document.createElement("li")
    li.classList.add("list-group-item", "d-flex", "justify-content-between")
    li.innerHTML = `<span>${movie.name}</span>
    <span>${movie.description}</span><span>${movie.imageUrl}</span>
    // <button type="button" class="btn btn-primary" id="${movie._id}">Update</span><span></button>
    // <button  type="button" class="btn btn-danger"  id="${movie._id}">Delete</button><span>`
    listed.appendChild(li)
  })
}

const delete_movie = () => {}

window.onload = () => {
  if (window.location === "backoffice.html") {
    load_backoffice()
  }
}

// load_add_category()
//render_list()
