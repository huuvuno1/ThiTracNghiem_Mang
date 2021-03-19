window.onload = () => {
    let saved = localStorage.getItem('saved');
    if (saved != null)
    {
        changeStyleBtnSave(saved);
        document.getElementById('btn_cancel_save').style.display = 'inline';
    }
}

function saveIndexQuestion(){
    let id = document.getElementById('qs_id').innerHTML;
    id = Number(id);
    localStorage.setItem('saved', id);
    changeStyleBtnSave(id)
    document.getElementById('btn_cancel_save').style.display = 'inline';
}

function changeStyleBtnSave(id)
{
    let btn = document.getElementById('btn_save');
        btn.innerText = "Đang lưu câu: " + id;
}

function resaveIndexQuestion(){
    localStorage.clear();
    document.getElementById('btn_cancel_save').style.display = 'none';
    document.getElementById('btn_save').innerText = "Nhớ vị trí";
}

