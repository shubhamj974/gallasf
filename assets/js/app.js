let cl = console.log;
document.title = `Movies Gallary By Using CRUD`
const
    showMoviesForm = document.getElementById('showMoviesForm'),
    dropDownForm = document.getElementById('dropDownForm'),
    moviesDrop = document.getElementById('moviesDrop')
backgroundOverly = document.getElementById('backgroundOverly'),
    moviesContainer = document.getElementById('moviesContainer'),
    hideForm = [...document.querySelectorAll('.hideForm')],
    titleVal = document.getElementById('title'),
    imgUrlVal = document.getElementById('imgUrl'),
    ratingVal = document.getElementById('rating'),
    movieAddBtn = document.getElementById('movieAddBtn'),
    addBtn = document.getElementById('addBtn');

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16);
    })
};


let MovieArr = []

function movieTemp(arr) {
    let result = '';
    arr.forEach(ele => {
        result +=
            `
            <div class="col-md-4 col-sm-6 my-4">
                <div class="card-group" id = "${ele.id}">
                    <div class="card border-0">
                        <div class="card-header bg-primary text-white">
                            <h2>${ele.title}</h2>
                        </div>
                        <div class="card-body">
                            <img src="${ele.imgUrl}"
                                class="card-img-top" alt="logo">
                        </div>
                        <div class="card-footer">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <p>5/${ele.rating}</p>
                                    </div>
                                    <div class="col-sm-8 text-right">
                                        <button type="button" class="btn btn-primary" onclick = "editBtnHandler(this)"><i class="fas fa-user-edit"></i></button>
                                        <button type="button" class="btn btn-danger" id="deleteBtn" onclick = "deleteBtnHandler(this)"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    moviesContainer.innerHTML = result
}
MovieArr = JSON.parse(localStorage.getItem('MoviesData')) || [];
movieTemp(MovieArr)

const OnclickHandler = () => {
    dropDownForm.classList.toggle('visible');
    backgroundOverly.classList.toggle('visible')
    movieAddBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
    moviesDrop.reset();

}

const OnSubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
        title: titleVal.value,
        imgUrl: imgUrlVal.value,
        rating: ratingVal.value,
        id: generateUuid()
    }
    MovieArr.unshift(obj)
    e.target.reset()
    localStorage.setItem('MoviesData', JSON.stringify(MovieArr))
    movieTemp(MovieArr)
    dropDownForm.classList.toggle('visible');
    backgroundOverly.classList.toggle('visible')
}

const editBtnHandler = (e) => {
    let UpdateId = e.closest('.card-group').getAttribute('id');
    localStorage.setItem('editItem', UpdateId)
    let editItem = MovieArr.find(ele => ele.id = UpdateId)
    titleVal.value = editItem.title,
        imgUrlVal.value = editItem.imgUrl,
        ratingVal.value = editItem.rating
    dropDownForm.classList.toggle('visible');
    backgroundOverly.classList.toggle('visible');
    movieAddBtn.classList.remove('d-none');
    addBtn.classList.add('d-none');
}

const OnupdateBtnHandler = (e) => {
    let UpdateItem = localStorage.getItem('editItem')
    MovieArr.forEach(item => {
        if (item.id === UpdateItem) {
            item.title = titleVal.value,
                item.imgUrl = imgUrlVal.value,
                item.rating = ratingVal.value
        }
    })
    localStorage.setItem('MoviesData', JSON.stringify(MovieArr))
    movieTemp(MovieArr);
    moviesDrop.reset();
    dropDownForm.classList.toggle('visible');
    backgroundOverly.classList.toggle('visible');
}

const deleteBtnHandler = (e) => {
    let deleteItem = e.closest('.card-group').id;
    let deleteFindInd = MovieArr.findIndex(index => index.id === deleteItem);
    MovieArr.splice(deleteFindInd, 1);
    localStorage.setItem('MoviesData', JSON.stringify(MovieArr))
    movieTemp(MovieArr);
}

showMoviesForm.addEventListener('click', OnclickHandler);
hideForm.forEach(hide => hide.addEventListener('click', OnclickHandler));
moviesDrop.addEventListener('submit', OnSubmitHandler);
movieAddBtn.addEventListener('click', OnupdateBtnHandler);