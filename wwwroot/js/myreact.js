function Name(props) {
    
    return <label ><input name="adminName" type="radio" value={props.name}  onClick={handleClick}/>{props.name} </label> ;

}
function Msg(props) {
    return <h1>{props.msg}</h1>;
}

function Msg2(props) {
    return <span >{props.msg}</span>;
}
function Login() {
    return (
    <div>
        <Msg msg="please choose your name" />
        <Name name="Admin" />
        <Msg2 msg="  "/>
        <Name name="Tom" />
    </div>
    );
}
function AddNewbutton()
{
    return (
        <div>
            <input  type="button" value="New" onClick={addNew} ></input>
        </div>
        );
}

function beforeLogin(){
    ReactDOM.render(
        <Login />,
        document.getElementById('app')
    );
}
function showTable()
{
    ReactDOM.render(
        <div>
            <Mytable />
            <AddNewbutton />
        </div>,
        document.getElementById('app')
    );
    loadTmpl("/tmpl/data.html","/home/GetAllUser","#tableBody"); 
}
function handleClick(e) {
        
    var val = e.target.value;
    console.log(e.target.value);
    loadUserInforByName(val);
}

function loadUserInforByName(name)
{

    postDataBack("/home/GetUserByName", {name:name}, (data)=>{
        //console.log(data);
        ReactDOM.render(
            <AfterLogin user={data} />,
            document.getElementById('navBar')
        );
    });
    
    showTable();
}

function AfterLogin(props) {
    return (
    <div>
        <input type="hidden" id="userId" value={props.user.userId}></input>
        <Msg2 msg="Welcome  "/>
        <Msg2 msg={props.user.firstName} />
        <Msg2 msg=" . "/>
        <Msg2 msg={props.user.lastName} />
        <Msg2 msg=" | Your email : "/>
        <Msg2 msg={props.user.email} />
    </div>
    );
}

function EditUserInfo(props) {
    return (
        <label >
        <input type="hidden" id="editUserId" value={props.user.userId}></input>
        <Msg2 msg="  | Current to edit user:  "/>
        <Msg2 msg={props.user.firstName} />
        <Msg2 msg=" . "/>
        <Msg2 msg={props.user.lastName} /></label>
    );
}

function renderEditPage()
{
    ReactDOM.render(
        <EditTable />,
        document.getElementById('app')
    );
}

const spanStyle={
    position:'relative',
    left:'20px',
};
function tick() {
    const element = (
      <label>
        <span style={spanStyle}>Right Now : {new Date().toString()}.</span>
      </label>
    );
    ReactDOM.render(
      element,
      document.getElementById('clock')
    );
}

function renderEditUser(user)
{
    ReactDOM.render(
        <EditUserInfo  user={user}/>,
        document.getElementById('bottomInfo')
    );
}
function removeBottom()
{
    ReactDOM.unmountComponentAtNode(document.getElementById('bottomInfo'));
}