//Register Page - Verificare conditii email pentru span
function validateEmail(){
    let email = document.getElementById("email").value;
    let strengthEmail = document.getElementById('validEmail');
    let validSymbols = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(email.match(validSymbols)){
        strengthEmail.style.backgroundColor = "green";
        strengthEmail.textContent = "Valid Email";
        
    }else{
        strengthEmail.style.backgroundColor = "red";
        strengthEmail.textContent = "Invalid Email";
        
    }
}


//Register Page - Verificare conditii parola pentru span
function checkPassword(){
    let pass = document.getElementById("pass").value;
    let strengthBadge = document.getElementById('StrengthDisp');
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

    if(strongPassword.test(pass)){
        strengthBadge.style.backgroundColor = "green"
        strengthBadge.textContent = 'Strong';
    }else if(mediumPassword.test(pass)){
        strengthBadge.style.backgroundColor = "blue"
        strengthBadge.textContent = 'Medium';
    }else{
        strengthBadge.style.backgroundColor = 'red';
        strengthBadge.textContent = 'Week';
    }
}


//Register Page - Verificare conditii username pentru span
function checkUser(){
    let user = document.getElementById("user").value;
    let strengthUser = document.getElementById('StrengthUser');
    let strongUser = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])');

    if(strongUser.test(user)){
        strengthUser.style.background = "green";
        strengthUser.textContent = "Valid Username";
    }else{
        strengthUser.style.background = "red";
        strengthUser.textContent = "Invalid Username";
    }
}


//Register Page - Verificare firstname (cel putin 2 caractere) pentru span
function checkFirstName(){
    let str = document.getElementById("firstName").value;
    let strongFirstName = document.getElementById("StrengthFirstName");

    if(str.length >= 2){
        strongFirstName.style.backgroundColor = "green";
        strongFirstName.textContent = "Valid First Name"
    }else{
        strongFirstName.style.backgroundColor = "red";
        strongFirstName.textContent = "Not enough words";
    }
}


//Register Page - Verificare lastname (cel putin 2 caractere) pentru span
function checkLastName(){
    let str = document.getElementById("lastName").value;
    let strongLastName = document.getElementById("StrengthLastName");

    if(str.length >= 2){
        strongLastName.style.backgroundColor = "green";
        strongLastName.textContent = "Valid Last Name"
    }else{
        strongLastName.style.backgroundColor = "red";
        strongLastName.textContent = "Not enough words";
    }
}


//Register Page - Verificare varsta (intre 18 si 65 ani) pentru span
function checkAge(){
    let age = document.getElementById("age").value;
    let validAge = document.getElementById("validAge");

    if(age < 18){
        validAge.style.backgroundColor = "red";
        validAge.textContent = "You are a minor";
    }else if(age > 65){
        validAge.style.backgroundColor = "red";
        validAge.textContent = "You are too old";
    }else{
        validAge.style.backgroundColor = "green";
        validAge.textContent = "Age is ok";
    }
}


//Register Page - Activare buton Register doar daca toate campurile au fost completate
function isEmpty(){
    if(document.getElementById("age").value !== " " ){
        document.getElementById("submit").removeAttribute("disabled")
    }  
}


//Register Page - Validare formular cu toate conditiile pentru fiecare input si stocare date in Local Storage. Fiecare register va genera o cheie unica. 
function store(){
    let email = document.getElementById("email").value;
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;

    let validSymbols = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let strongUser = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])');
    

    if(email.match(validSymbols) && strongPassword.test(password) && strongUser.test(username) && fName.length >= 2 && lName.length >= 2){
        localStorage.setItem(username, JSON.stringify([{email: email, username: username, password: password, fName: fName, lName: lName, age: age}]));
        window.location.replace('login.html')
        return false
    }else{
        document.getElementById("messagge").innerText = "Unsuccessfull registration. Please try again!"
        return false
        
    }
}


//Login Page - Logare daca userul si pass exista in local storage, daca nu mesaje de eroare + trimitere in local token de autentificare. 
function loginUser(){
    const username = document.getElementById('user').value
    const password = document.getElementById('pass').value
    const data_all = localStorage
    
    for(let i = 0; i < data_all.length; i++){
        if(username === Object.keys(data_all)[i]){
            const data_json = JSON.parse(localStorage.getItem(Object.keys(data_all)[i]))
            if(password === data_json[0].password && username === data_json[0].username){
                console.log('e ok')
                let authObj = {username: username};
                localStorage.setItem('authToken', JSON.stringify(authObj));
                window.location.replace('home_page.html')
                return false
            }
            else{
                document.getElementById('messagge').innerText = "Incorrect password!"
                return false
            }
        }
    }
    document.getElementById('messagge').innerText = "We didn't find your username in database!"
    return false
}


//Home Page - Afisare in pagina "hello, username" cu ajutorul token-ului.
let authToken = JSON.parse(localStorage.getItem('authToken'));
let username_hello = Object.values(authToken);
document.getElementById('hello').textContent = 'Hello, ' + username_hello


//Recover Password - Forgot password = eliminare din local storage cheie citita din input
function forgot_password(){
    let username = document.getElementById('user').value;
    let data_all = localStorage;

    for(let i = 0; i < data_all.length; i++){
        if(username === Object.keys(data_all)[i]){
            localStorage.removeItem(Object.keys(data_all)[i]);
            return true
        }
    }
    document.getElementById('messagge').innerText = "We didn't find your username in database!"
    return false
}


//Home Page - Verifica ca toate inputurile din add shift (mai putin textarea) sa fie completate.
//Salveaza datele in local storage intr-o singura cheie, cu ajutorul tokenului de autentificare.
function adding_shift(){
    let date = document.getElementById('date').value;
    let beggining_time = document.getElementById('start_time').value;
    let end_time = document.getElementById('end_time').value;
    let price_per_hour = document.getElementById('price').value;
    let shift_place = document.getElementById('workplace').value;
    let shift_slug = document.getElementById('shift_slug').value;
    let total_profit = (Math.abs(parseInt(beggining_time) - parseInt(end_time))) * price_per_hour;

    if(date == "" || beggining_time == "" || end_time == "" || price_per_hour == "" || shift_place == "Workplace" || shift_slug == ""){
        document.getElementById('messagge').innerText = "Please complete all the fields!"
        return false
    } else{
        let user_token = JSON.parse(localStorage.getItem('authToken'));

        let dataShift = {
            date: date,
            beggining_time: beggining_time,
            end_time: end_time,
            price_per_hour: price_per_hour,
            shift_place: shift_place,
            shift_slug: shift_slug,
            total_profit: total_profit
        }

        let local_elements = localStorage.getItem(`${user_token.username}-shifts`);
        if(!local_elements){
            let new_shift = [];
            new_shift.push(dataShift);
            localStorage.setItem(`${user_token.username}-shifts`, JSON.stringify(new_shift));
        }else{
            let local_elements_update = JSON.parse(local_elements);
            local_elements_update.push(dataShift);
            localStorage.setItem(`${user_token.username}-shifts`, JSON.stringify(local_elements_update));
        }
    }
}


//Home Page - Add shift - verifica ca SHIFT_SLUG sa fie o valoare unica. 
function shift_slug_unique (){
    let unique_shift = document.getElementById('shift_slug').value;

    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));
    console.log(local_shifts)

    for(let i = 0; i < local_shifts.length; i++){
        if(local_shifts[i].shift_slug === unique_shift){
            document.getElementById('error').innerText = 'Slug name already taken. Please try another!'
        }
    }
}


//Home Page - Click pe buton add shift, afiseaza divul cu formularul
function display_add_shift(){
    document.querySelector('.content_add_shift').style.display = 'flex';
}


//Home Page - Click pe butonul close shift, ascunde divul cu formularul
function hide_add_shift(){
    document.querySelector('.content_add_shift').style.display = 'none';
    window.location.href="home_page.html";
}


//Home Page - cautare tura dupa 2 date selectate de user si introdusa in tabel + edit shift
function search_between_2_dates(){
   let dateF = document.getElementById('dateF').value;
   let dateT = document.getElementById('dateT').value;

   let d1 = dateF.split("-");
   let d2 = dateT.split("-");

    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));

    for(let i = 0; i < local_shifts.length; i++){
        let date = local_shifts[i].date.split("-");
        if(date > d1 && date > d2){
            console.log('not ok')
        }else if(date < d1 && date < d2){
            console.log('tot not ok')
        }else{
            console.log('ok');
            let t_body = document.getElementById('tbody');
            let tr = document.createElement('tr');
            t_body.appendChild(tr);

            let td_date = document.createElement('td');
            td_date.innerText = local_shifts[i].date;
            tr.appendChild(td_date)

            let td_begginning_time = document.createElement('td');
            td_begginning_time.innerText = local_shifts[i].beggining_time;
            tr.appendChild(td_begginning_time);

            let td_end_time = document.createElement('td');
            td_end_time.innerText = local_shifts[i].end_time;
            tr.appendChild(td_end_time);

            let td_price_hour = document.createElement('td');
            td_price_hour.innerText = local_shifts[i].price_per_hour;
            tr.appendChild(td_price_hour);

            let td_shift_place = document.createElement('td');
            td_shift_place.innerText = local_shifts[i].shift_place;
            tr.appendChild(td_shift_place);

            let td_shift_slug = document.createElement('td');
            td_shift_slug.innerText = local_shifts[i].shift_slug;
            tr.appendChild(td_shift_slug);

            let td_total_profit = document.createElement('td');
            td_total_profit.innerText = local_shifts[i].total_profit;
            tr.appendChild(td_total_profit);

            let td_edit_shift = document.createElement('td');
            td_edit_shift.innerText = "Edit Shift";
            tr.appendChild(td_edit_shift);


            //Apasand pe edit shift incarca inputurile cu valorile din tabel, intereaza prin shifturi si aduce shiftul aferent pe care il salveaza intr-o variabila. 
            td_edit_shift.addEventListener('click', function () {
            document.querySelector('.content_edit_shift').style.display = 'flex';
            document.getElementById('date_edit').value = td_date.innerText;
            document.getElementById('start_time_edit').value = td_begginning_time.innerText;
            document.getElementById('end_time_edit').value = td_end_time.innerText;
            document.getElementById('price_edit').value = td_price_hour.innerText;
            document.getElementById('workplace_edit').value = td_shift_place.innerText;
            document.getElementById('shift_slug_edit').value = td_shift_slug.innerText;     
            
            let user_token = JSON.parse(localStorage.getItem('authToken'));
            let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));
            for(let i = 0; i < local_shifts.length; i++){
                let date_input = local_shifts[i].date;
                if(date_input === date_edit.value){
                    console.log('da');
                }
            }
                
            let active_shift = local_shifts[i];
            let save_edit = document.getElementById('save_edit');


            //Butonul save - edit shift. Noile modfificari aduse de user sunt inlocuite in array de shifturi cu splice.
            save_edit.addEventListener('click', function (){
                if(date_edit.value !== active_shift.date || start_time_edit.value !== active_shift.beggining_time || end_time_edit.value !== active_shift.end_time || price_edit.value !== active_shift.price_per_hour || workplace_edit.value !== active_shift.shift_place || shift_slug_edit.value !== active_shift.shift_slug || total_profit !== active_shift.total_profit){
                    console.log('modificat');
                    let edit_data = {
                        date: date_edit.value, 
                        beggining_time: start_time_edit.value, 
                        end_time: end_time_edit.value, 
                        price_per_hour: price_edit.value, 
                        shift_place: workplace_edit.value, 
                        shift_slug: shift_slug_edit.value,
                        total_profit: (Math.abs(parseInt(start_time_edit.value) - parseInt(end_time_edit.value))) * price_edit.value
                    };
                    local_shifts.splice(i, 1, edit_data);
                    localStorage.setItem(`${user_token.username}-shifts`, JSON.stringify(local_shifts));      
                    window.location.href="home_page.html";         
                }
            });
            })
        }
    }
}



///Home Page = cautare tura dupa numele turei si introdusa in tabel + edit shift
function search_by_name(){
    let name_search = document.getElementById('input_search_name').value;

    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));

    for(let i = 0; i < local_shifts.length; i++){
        let search_slug = local_shifts[i].shift_slug
        if(search_slug !== name_search){
            console.log('nok');
        }else{
            console.log('ok');
            let t_body = document.getElementById('tbody');
            let tr = document.createElement('tr');
            t_body.appendChild(tr);

            let td_date = document.createElement('td');
            td_date.innerText = local_shifts[i].date;
            tr.appendChild(td_date)

            let td_begginning_time = document.createElement('td');
            td_begginning_time.innerText = local_shifts[i].beggining_time;
            tr.appendChild(td_begginning_time);

            let td_end_time = document.createElement('td');
            td_end_time.innerText = local_shifts[i].end_time;
            tr.appendChild(td_end_time);

            let td_price_hour = document.createElement('td');
            td_price_hour.innerText = local_shifts[i].price_per_hour;
            tr.appendChild(td_price_hour);

            let td_shift_place = document.createElement('td');
            td_shift_place.innerText = local_shifts[i].shift_place;
            tr.appendChild(td_shift_place);

            let td_shift_slug = document.createElement('td');
            td_shift_slug.innerText = local_shifts[i].shift_slug;
            tr.appendChild(td_shift_slug);

            let td_total_profit = document.createElement('td');
            td_total_profit.innerText = local_shifts[i].total_profit;
            tr.appendChild(td_total_profit);

            let td_edit_shift = document.createElement('td');
            td_edit_shift.innerText = "Edit Shift";
            tr.appendChild(td_edit_shift);


            //Apasand pe edit shift incarca inputurile cu valorile din tabel, intereaza prin shifturi si aduce shiftul aferent pe care il salveaza intr-o variabila. 
            td_edit_shift.addEventListener('click', function () {
                document.querySelector('.content_edit_shift').style.display = 'flex';
                document.getElementById('date_edit').value = td_date.innerText;
                document.getElementById('start_time_edit').value = td_begginning_time.innerText;
                document.getElementById('end_time_edit').value = td_end_time.innerText;
                document.getElementById('price_edit').value = td_price_hour.innerText;
                document.getElementById('workplace_edit').value = td_shift_place.innerText;
                document.getElementById('shift_slug_edit').value = td_shift_slug.innerText;     
                
                let user_token = JSON.parse(localStorage.getItem('authToken'));
                let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));
                for(let i = 0; i < local_shifts.length; i++){
                    let date_input = local_shifts[i].date;
                    if(date_input === date_edit.value){
                        console.log('da');
                    }
                }
                
                let active_shift = local_shifts[i];
                let save_edit = document.getElementById('save_edit');


                //Butonul save - edit shift. Noile modfificari aduse de user sunt inlocuite in array de shifturi cu splice.
                save_edit.addEventListener('click', function (){
                    if(date_edit.value !== active_shift.date || start_time_edit.value !== active_shift.beggining_time || end_time_edit.value !== active_shift.end_time || price_edit.value !== active_shift.price_per_hour || workplace_edit.value !== active_shift.shift_place || shift_slug_edit.value !== active_shift.shift_slug || total_profit !== active_shift.total_profit){
                        console.log('modificat');
                        let edit_data = {
                            date: date_edit.value, 
                            beggining_time: start_time_edit.value, 
                            end_time: end_time_edit.value, 
                            price_per_hour: price_edit.value, 
                            shift_place: workplace_edit.value, 
                            shift_slug: shift_slug_edit.value,
                            total_profit: (Math.abs(parseInt(start_time_edit.value) - parseInt(end_time_edit.value))) * price_edit.value
                        };
                        local_shifts.splice(i, 1, edit_data);
                        localStorage.setItem(`${user_token.username}-shifts`, JSON.stringify(local_shifts));    
                        window.location.href="home_page.html";              
                    }
                });
            });
        }
    }
}

//Buton Close - Edit shift - ascunde divul cu formularul
function close_edit_shift(){
    document.querySelector('.content_edit_shift').style.display = 'none';
}


//Click pe buton edit profile, afiseaza divul cu formularul + populeaza inputurile cu valorile din local 
function display_edit_profile(){
    document.querySelector('.content_edit_profile').style.display = 'flex';

    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let user_token_value = Object.values(user_token);

    for(let i = 0; i < localStorage.length; i++){
        if(user_token_value == Object.keys(localStorage)[i]){
            console.log('da');
            let active_key = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]));
            console.log(active_key);

            document.getElementById('edit_email').value = active_key[0].email;
            document.getElementById('edit_password').value = active_key[0].password;
            document.getElementById('edit_FName').value = active_key[0].fName;
            document.getElementById('edit_LName').value = active_key[0].lName;
            document.getElementById('edit_age').value = active_key[0].age;
        }
    }
}


//Click pe butonul close profile, ascunde divul cu formularul
function hide_edit_profile(){
    document.querySelector('.content_edit_profile').style.display = 'none';
}


//Preia valorile din input. Itereaza prin local storage, aduce obiectul si inlocuieste in apel modificarile aduse utilizand splice. 
function edit_profile(){
    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let user_token_value = Object.values(user_token);

    let edit_email = document.getElementById('edit_email').value;
    let edit_password = document.getElementById('edit_password').value;
    let edit_FName = document.getElementById('edit_FName').value;
    let edit_LName = document.getElementById('edit_LName').value;
    let edit_age = document.getElementById('edit_age').value;

    for(let i = 0; i < localStorage.length; i++){
        if(user_token_value == Object.keys(localStorage)[i]){
            console.log('da');
            let active_key = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]));
            console.log(active_key);

            if(active_key[0].email !== edit_email || active_key[0].password !== edit_password || active_key[0].fName !== edit_FName || active_key[0].lName !== edit_LName || active_key[0].age !== edit_age){
                console.log('se modif');

                let edit_info = {
                    email: edit_email,
                    password: edit_password,
                    fName: edit_FName,
                    lName: edit_LName,
                    age: edit_age,
                    username: user_token_value[0]
                }

                active_key.splice(0, 1, edit_info);
                localStorage.setItem(user_token_value, JSON.stringify(active_key))
            }

        }
    }
    window.location.href="home_page.html";
}


//Logout - delogheaza utilizatorul, sterge tokenul din local storage.
function logout(){
    localStorage.removeItem('authToken');
    window.location.href="login.html";
}


//Salary per shift - creare grafic salariu
function chart(){
    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));
    let xValues = []
    for(let i = 0; i < local_shifts.length; i++){
        let data_input_slug = local_shifts[i].shift_slug;
        xValues.push(data_input_slug);
        console.log(xValues)
    }

    let yValues = []
    for(let i = 0; i < local_shifts.length; i++){
        let data_input_profit = local_shifts[i].total_profit;
        yValues.push(data_input_profit);
        console.log(yValues)
    }
    
    let barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
    ];

    new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "Salary per shift"
          }
        }
      });
}

//Salary per shift page - creaza tabelul dinamic cu toate shifturile stocate in local.
function salary_per_shift(){

    let user_token = JSON.parse(localStorage.getItem('authToken'));
    let local_shifts = JSON.parse(localStorage.getItem(`${user_token.username}-shifts`));

    for(let i = 0; i < local_shifts.length; i++){
        let t_body = document.getElementById('tbody');
        let tr = document.createElement('tr');
        t_body.appendChild(tr);

        let td_date = document.createElement('td');
        td_date.innerText = local_shifts[i].date;
        tr.appendChild(td_date)

        let td_begginning_time = document.createElement('td');
        td_begginning_time.innerText = local_shifts[i].beggining_time;
        tr.appendChild(td_begginning_time);

        let td_end_time = document.createElement('td');
        td_end_time.innerText = local_shifts[i].end_time;
        tr.appendChild(td_end_time);

        let td_price_hour = document.createElement('td');
        td_price_hour.innerText = local_shifts[i].price_per_hour;
        tr.appendChild(td_price_hour);

        let td_shift_place = document.createElement('td');
        td_shift_place.innerText = local_shifts[i].shift_place;
        tr.appendChild(td_shift_place);

        let td_shift_slug = document.createElement('td');
        td_shift_slug.innerText = local_shifts[i].shift_slug;
        tr.appendChild(td_shift_slug);

        let td_total_profit = document.createElement('td');
        td_total_profit.innerText = local_shifts[i].total_profit;
        tr.appendChild(td_total_profit);
    }
}

