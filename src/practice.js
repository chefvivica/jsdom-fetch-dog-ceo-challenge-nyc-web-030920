document.addEventListener("DOMContentLoaded", e=>{
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const container = document.querySelector("#dog-image-container")
    const ul = document.querySelector("#dog-breeds")
    const dogSelect = document.querySelector('#breed-dropdown')

    const fetchImage = () =>{
        fetch(imgUrl)
        .then(resp => resp.json())
        .then(renderImage)
    }
    
    const addImg = (pic) =>{
        const img = document.createElement("img")
        img.src = pic
        return img
    }
    const renderImage = (message)=>{
        message.message.forEach(pic => {
            const img = addImg(pic)
            container.append(img)
        });
    }
    const fetchBreed = () =>{
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(renderBreed)
    }
    const addLi = (breed) =>{
        const li = document.createElement("li")
        li.textContent = breed
        li.className = "breedLi"
        return li
    }
    const renderBreed = (message) =>{
        let obj = {}
        let breedArray = []
        obj = message.message
        breedArray = Object.keys(obj)
        breedArray.forEach(breed =>{
            const li = addLi(breed)
            ul.appendChild(li)
            sortDog(breedArray)
        })
    }

    const sortDog = breedArray =>{
        dogSelect.addEventListener("change",e=>{
            const li = document.getElementsByClassName('breedLi')
            ul.innerHTML=''
            if(e.target.value === "a"){  
                wordFilter(breedArray, "a")
            }else if (e.target.value === "b"){
                wordFilter(breedArray, "b")     
            }else if (e.target.value === "c"){
                wordFilter(breedArray, "c")
            }else if (e.target.value === "d"){
                wordFilter(breedArray, "d")
            }
        })
    }

    const wordFilter = (arr, firstLetter) =>{   
        let breedArray =[] 
        let newArray = arr.filter(word => word[0]===firstLetter)
        newArray.forEach(ele =>{
            const li = addLi(ele)
            ul.append(li)
        })
    }

    fetchImage()
    fetchBreed()

})