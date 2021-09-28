function Mytable(){
    const Head = [
        {header: 'UserId' },
        {header: 'FirstName'},
        {header: 'LastName'},
        {header: 'Address'},
        {header: 'TelePhone'},
        {header: 'Email'},
        {header: 'UpdateDate'},
        {header: 'YourAction'}
      ];
    return(
        <table >
        <TableHead Head={Head} />
            <tbody id="tableBody">
                    <tr>
                        <td colSpan="7" id="content">
                            Loading...
                        </td>
                    </tr>
            </tbody>
        </table>
    );
}
const TableHead = (props) => {
    const myHead = props.Head.map((item, index) => {
      return <th key={index}>{item.header}</th>
    });
    return (
      <thead>
        <tr>
          {myHead}
        </tr>
      </thead>
    );
}

function EditTable(){

  return(
    <table >
      <tbody >
          <EditTrMsg  Msg="First name"/>
          <EditTrInput  id="firstName"/>
          <EditTrMsg  Msg="Last name"/>
          <EditTrInput  id="lastName"/>
          <EditTrMsg  Msg="Address"/>
          <EditTrInput  id="address"/>
          <EditTrMsg  Msg="TelePhone"/>
          <EditTrInput  id="telePhone"/>
          <EditTrMsg  Msg="Email"/>
          <EditTrInput  id="email"/>
          <SubmitBtn />
      </tbody>
    </table>
  );
}

const EditTrMsg = (props)=>
{
  return(
      <tr>
      <td >
          <span>{props.Msg}</span>
      </td>
  </tr>
  );
}
const EditTrInput = (props)=>
{
  return(
      <tr>
      <td >
      <input type="text" id={props.id}></input>
      </td>
  </tr>
  );
}

const SubmitBtn = (props)=>
{
  return(
      <tr>
          <td >
            <input type="button" value="Save" onClick={saveUpdate} ></input>
          </td>
      </tr>
  );
}