import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
  id: ""
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  let copy = [...colors]

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(colorToEdit)
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(copy.map(element => {
          if (element.id === res.data.id){
            console.log('Wooooooo')
            return res.data
            //element = colorToEdit
          } else {
            console.log('Errrrrrror')
            return element
          }
        }))
      })
  };

  const saveNew = color => {
    color.preventDefault();
    console.log({...colorToAdd})
    setColorToAdd({...colorToAdd, id: colors.length})
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res => {
        console.log(colorToAdd)
        updateColors([...colors, colorToAdd])
      })
  };

  const deleteColor = color => {
    console.log(color)
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(element => element.id !== color.id))
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
        <form onSubmit={saveNew}>
          <legend>new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
