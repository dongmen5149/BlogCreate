import React from "react";
import { Editor, EditorState, RichUtils, DraftEditorCommand } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Text, TextForm } from "./styles";


const TextEditor = () => {
    const [editorState, setEditorState] = React.useState<EditorState>(
        EditorState.createEmpty()
    );

    const handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };


    return (
        <TextForm>
            <Button onMouseDown={(e) => handleBlockClick(e, "header-one")}>h1</Button>
            <Button onMouseDown={(e) => handleBlockClick(e, "header-two")}>h2</Button>
            <Button onMouseDown={(e) => handleBlockClick(e, "header-three")}>h3</Button>
            <Button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>normal</Button>
            <Button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</Button>
            <Button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>italic</Button>
            <Button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>strikthrough</Button>
            <Button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>ol</Button>
            <Button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>ul</Button>
            <Text>
                <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
            </Text>

        </TextForm>
    )
};

export default TextEditor;