const pokemomName = document.querySelector('.pokemom__name');
const pokemomNumber = document.querySelector('.pokemom__number');
const pokemomImg = document.querySelector('.pokemom__img');
const pokemomForm = document.querySelector('.form');
const pokemomInput = document.querySelector('.input__search');

//next e prev
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let buscaPokemom =1;



const fetchPokemom = async (pokemom)=>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemom}`); //passa todo input para minuscula
   //VERIFICANDO RESPOSTA DA BUSCA
        if(APIresponse.status === 200){
            //extraindo o JSON da requisição fetch
            const data = await APIresponse.json();
            return data;
        }   
}

const renderPokemom = async (pokemom)=>{
    pokemomName.innerHTML ='Carregando...'; //Esperando o await
    const data = await fetchPokemom(pokemom);
    //buscando se existe resposta no data
        if(data){
    pokemomImg.style.display = 'block';
    pokemomName.innerHTML =data.name;
    pokemomNumber.innerHTML = data.id;
    pokemomImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemomInput.value='';
    buscaPokemom = data.id;
    console.log(data);
    } else{
        pokemomImg.style.display = 'none';
        pokemomNumber.innerHTML=''
        pokemomName.innerHTML ='Não encontrado';
        pokemomInput.value='';
    }
}

pokemomForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemom(pokemomInput.value.toLowerCase()); 
    
    console.log(pokemomInput.value);
});

//Adicionando onClick nos botoes Prev e Next

next.addEventListener('click', ()=>{
    buscaPokemom +=1;    
    renderPokemom(buscaPokemom);
});

prev.addEventListener('click', ()=>{
        if(buscaPokemom>1){
            buscaPokemom -=1;
            renderPokemom(buscaPokemom);
        }    
});

renderPokemom(buscaPokemom);