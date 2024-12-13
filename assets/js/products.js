const products = [];
const productsHost = "https://0resmon.com/products/products.json";

$(document).ready(function() {
    var loaded = false;
    $.ajax({
        url: productsHost,
        type: 'GET',
        success: function(data) {
            data = data.reverse();
            $.each(data, function(key, val) {
                products.push(val);
                AddNewProductToList(val);
            });
            loaded = true;
        }
    });
});

AddNewProductToList = (val) => {
    var packageType = "Open Source";
    var name = val.name;
    name = name.split("|")[0];
    name = name.trim();
    var price = val.price;
    var price2 = price + (price * 0.25);
    price = price.toFixed(2);
    price = price.toString().replace(".", ",");
    price2 = price2.toFixed(2);
    price2 = price2.toString().replace(".", ",");
    if(name.toLowerCase().includes("open source") == false) {
        packageType = "Escrow";
    }
    if(name.toLowerCase().includes("open source")) {
        name = name.replace(/open source/i, "");
    }
    if(name.toLowerCase().includes("escrow") && name.toLowerCase().includes("open source")) {
         name = "Open Source & Escrow";
    }
    if(val.disabled != false) { return; }
    if(val["category"].name == "QBCore / Qbox") {return;}
    $("#packageContainer").append(`
            <div class="package-item bg-[#0B0B0B] overflow-hidden md:gap-1 gap-4 md:w-[19.3vw] w-full flex flex-col   md:h-[28vh] h-[30vh] ">
          <a href="https://0resmon.tebex.io/package/${val.id}" target="_blank">
            <div class="w-full h-[20vh] overflow-hidden relative hover:opacity-40 transition-opacity duration-300">
              <img src="${val.image}" class=" absolute z-[6] w-full h-full"> 
                
                    <div class="absolute package__extra w-full gap-2 flex flex-wrap p-2 h-full z-[9999] cursor-pointer " >
                        <div class="w-auto h-[4vh] flex truncate justify-center items-center fontinter font-bold text-white p-2 items-center gap-2  text-xl bg-[#2b2b2bb3]">
                        
                            <p>ESX, QBCore &amp; Qbox</p>
                        </div>
                                                                <div class="w-auto h-[4vh] flex truncate justify-center items-center fontinter font-bold text-white p-2 items-center gap-2  text-xl bg-[#2b2b2bb3]">
                                <p>${packageType}</p>
                            </div>
                        
                        
                        
                    </div>

            </div>

</a> 
                <div class="w-full h-[4vh]  p-2 flex   fontinter font-bold text-white text-xl packagename">
                    ${name}
                </div>

            <div class="w-full h-[3vh] flex justify-between  p-2">
                <div class="md:w-[14vw] w-[70vw] h-full flex items-center gap-3 text-[#E7434F] fontinter font-bold text-3xl">
                   ${price} EUR
                                                                                            <span class="line-through text-xl text-[#3E3E3E]">${price2} EUR</span>
                                                
                </div>
                
                <div class="md:w-[5vw] w-[10vw] h-full flex justify-end items-center">
                                                        <div class="md:w-[1.5vw] md:h-[1.5vw] w-[6vw] h-[6vw] bg-[#E7434F] flex justify-center items-center hover:opacity-[80%] transition-all cursor-pointer" onclick="window.open('https://0resmon.tebex.io/package/${val.id}') ">
                            <svg width="18" height="18" viewBox="0 0 18 18" class="hover:animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.51831 0L2.17775 5.84598H0.899841C0.761518 5.84613 0.625088 5.87813 0.501127 5.93951C0.377166 6.00088 0.269004 6.08998 0.185025 6.19989C0.101045 6.30981 0.0435054 6.43758 0.0168651 6.57331C-0.00977525 6.70905 -0.00480015 6.84909 0.0314044 6.98259L2.55032 16.2186C2.65473 16.5994 2.88119 16.9353 3.19494 17.1749C3.50869 17.4146 3.89241 17.5446 4.2872 17.5451H13.7122C14.5204 17.5451 15.2349 17.0007 15.4491 16.2177L17.968 6.98169C18.0046 6.84815 18.0099 6.70793 17.9834 6.57202C17.9568 6.4361 17.8992 6.30816 17.815 6.1982C17.7309 6.08823 17.6224 5.99922 17.4981 5.93812C17.3739 5.87702 17.2371 5.84548 17.0987 5.84598H15.8208L12.4802 0L10.9179 0.892735L13.7482 5.84598H4.2503L7.08059 0.892735L5.51831 0ZM10.7991 9.44571H12.599V13.9454H10.7991V9.44571ZM5.39952 9.44571H7.19938V13.9454H5.39952V9.44571Z" fill="white"></path>
                            </svg>
                        </div>
                             
                </div>
            </div>
        </div>
        
        `);
  
}


$(document).on("input", "#searchInput", function () {

    const search = $(this).val().toLowerCase();
  
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search);
    });

    $("#packageContainer").html("");

    filteredProducts.forEach(product => {
        AddNewProductToList(product);
    });
 
});
 

