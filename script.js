async function getdata(){
    q=document.getElementById('search').value;
    let resp= await fetch('https://developers.zomato.com/api/v2.1/locations?query='+q,
                {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                );
    let data= await resp.json();
    console.log(data);
    
    
    if(data.location_suggestions.length != 0){
        let entity_id=data.location_suggestions[0].entity_id;
        let entity_type=data.location_suggestions[0].entity_type;
        let resp1=await fetch('https://developers.zomato.com/api/v2.1/location_details?entity_id='+entity_id+'&entity_type='+entity_type,
                    {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                    );    
        let restaurant_data= await resp1.json();
        console.log(restaurant_data);
        let nearby_res=restaurant_data.nearby_res;
        rest_data(nearby_res);                  
    }
    
}
 let txt='';
 async function rest_data(ns){
    let s=document.createElement("div");
    
    let c=ns.length-1;
    console.log(c,ns[c]);
    if(c!=0){
        let rest_resp=await fetch('https://developers.zomato.com/api/v2.1/restaurant?res_id='+ns[c],
        {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
        );
        let res= await rest_resp.json();
        txt+=`<div class='col-lg card2'>
                <img src=`+res.featured_image+` style='width: 343px; height: 234px; border-radius: 17px;'>
                <p style='font-family: Raleway; font-size: 26px; font-style: bold'>`+res.name+`</p>
                <p style='color: darkred; font-style: italic;'> Rating - `+res.user_rating.aggregate_rating+` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg> (`+res.all_reviews_count+` reviews )</p>
                <p>`+res.cuisines+`</p>
                </div>`;    
        ns.pop();
        console.log(txt);
        rest_data(ns);
    }
    else{
        s.setAttribute('class','row d-flex justify-content-center');
        s.setAttribute('id','card');
        s.setAttribute('style','padding-left: 100px; padding-top: 60px; padding-right: 100px; padding-bottom: 60px;');
        if(document.getElementById("main")){
            document.getElementById("main").remove();
        }
        if(document.getElementById("card")){
            document.getElementById("card").remove();
        }
        if(document.getElementById("dish")){
            document.getElementById("dish").remove();
        }
        console.log(txt);
        s.innerHTML+=txt;    
        document.body.append(s);
    }       
}


async function get_collection(cid){
    q=document.getElementById('search').value;
    let resp= await fetch('https://developers.zomato.com/api/v2.1/locations?query='+cid,
                {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                );
    let data= await resp.json();
    console.log(data);
    if(document.getElementById("main")){
        document.getElementById("main").remove();
    }
    if(document.getElementById("card")){
        document.getElementById("card").remove();
    }
    let s=document.createElement("div");
    let text='';
    let city_id='';
    if(data.location_suggestions.length != 0){
        city_id=data.location_suggestions[0].city_id;   
    }
    else{
        city_id=cid;
    }
    let c=0;
    function newg(){c=1;};
    let resp1=await fetch('https://developers.zomato.com/api/v2.1/collections?city_id='+city_id,
                    {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                    );    
    let collection_data= await resp1.json();
    console.log(collection_data);
    collection_data.collections.forEach(element => {
        text+=`<div class='col-lg card2'>
                    <div class='card align-text-bottom text-light card1' style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 85%), url(`+element.collection.image_url+`);">
                        <div style="width: 18.9rem; margin-left: 15px;">
                            <h4>`+element.collection.title+`</h4>
                            <p>`+element.collection.description +`</p>
                        </div>                  
                    </div>
                </div>`;
    });
    if(document.getElementById("dish")){
        document.getElementById("dish").remove();
    }

    s.setAttribute('class','row d-flex justify-content-center');
    s.setAttribute('id','card');
    s.setAttribute('style','padding-left: 100px; padding-top: 60px; padding-right: 100px; padding-bottom: 60px;');
    s.innerHTML+=text;    
    document.body.append(s);
}    

async function get_cuisines(){
    q=document.getElementById('search').value;
    let resp= await fetch('https://developers.zomato.com/api/v2.1/locations?query='+q,
                {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                );
    let data= await resp.json();
    console.log(data);
    let s=document.createElement("div");
    let cuisine_list=[];
    if(data.location_suggestions.length != 0){
        let city_id=data.location_suggestions[0].city_id;
        let resp1=await fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id='+city_id,
                    {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                    );    
        let cuisine_data= await resp1.json();
        console.log(cuisine_data);
        cuisine_data.cuisines.forEach(element => {
            cuisine_list.push({id : element.cuisine.cuisine_id ,name : element.cuisine.cuisine_name});
        });
        //console.log(cuisine_list);
    }
}

async function get_rest_on_rating(){
    q=document.getElementById('search').value;
    let resp= await fetch('https://developers.zomato.com/api/v2.1/locations?query='+q,
                {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                );
    let data= await resp.json();
    console.log(data);
    let s=document.createElement("div");
    let cuisine_list=[];
    if(data.location_suggestions.length != 0){
        let entity_id=data.location_suggestions[0].entity_id;
        let entity_type=data.location_suggestions[0].entity_type;
        let resp1=await fetch('https://developers.zomato.com/api/v2.1/search?entity_id='+entity_id+'&entity_type='+entity_type+'&count=20&cuisines='+c_list+'&sort=rating&order=desc',
                    {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                    );    
        let rate_data= await resp1.json();
        console.log(rate_data);
        //console.log(cuisine_list);
    }
}
                   
async function get_location(lati,long){
    let lat=lati;
    let lng=long;
    var x = document.createElement("div");
    let resp= await fetch('https://developers.zomato.com/api/v2.1/geocode?lat='+lat+'&lon='+lng,
                {headers: {'user-key': '5f4b823eb10e73b78b89ab21ca096387'}}
                );
    let data= await resp.json();
    console.log(data);
    x.innerHTML=`<p>`+data.location.title+`,`+data.location.city_name+`,`+data.location.country_name+`</p>`; 
    x.setAttribute("class","card");
    x.setAttribute("style","text-align: center;font-family: cursive;font-size: larger;")
    document.body.append(x);       
    disp_options(data.location.city_id);
}


function detect_Location() {  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
        
    }
}

function showPosition(position) {
   get_location(position.coords.latitude , position.coords.longitude);
}

function disp_options(cid){
    let t=document.createElement("div");
    let cd=cid;
    let qu=document.getElementById('search').value;
    t.innerHTML=`<div class="col">
                    <div class="card" style="border:transparent; padding-bottom:60px"> 
                        <image style='width:610px;height:400px' src='https://i.pinimg.com/originals/ee/08/f2/ee08f2a462156f94e6a7034baa73d6ab.jpg'>
                        <button class="btn-primary-outline" style='width: 610px;height: 40px;font-family: 'Lobster';font-size: 28px;' onclick=get_collection()>Collections</button>
                    </div>                
                </div>
                 <div class="col">
                    <div class="card" style="border:transparent; padding-bottom:60px">
                    <image style='width:610px;height:400px' src='https://c0.wallpaperflare.com/preview/565/228/846/japanese-japan-restaurant-culture.jpg'>
                        <button class="btn-primary-outline" style='width: 610px;height: 40px;font-family: 'Lobster';font-size: 28px;' onclick=getdata()>Restuarants</button>
                    </div>
                 </div>`;
    /*if(document.getElementById("main")){
        document.getElementById("main").remove();
    }
    if(document.getElementById("card")){
        document.getElementById("card").remove();
    } */            
    t.setAttribute("class","row home");
    t.setAttribute("id","dish");
    document.body.append(t);            

}