import { Component, useState, createRef, } from "react";
import styled from "styled-components";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromRaw, convertToRaw, } from 'draft-js';
import 'draft-js/dist/Draft.css';




const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    margin: 16px 0 0 16px;

    .code-block {
      background-color: rgba(0, 0, 0, 0.05);
      font-family: "Inconsolata", "Menlo", "Consolas", monospace;
      border-radius: 4px;
      font-size: 16px;
      padding: 8px 4px;
    }

    .RichEditor-editor {
      
      /* display: flex; */
      height: calc(100vh - 54px - 54px - 16px - 8px);
      overflow-y: scroll;
    }

`;

const ToolRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const ToolContainer = styled.div`
    margin: 12px 0;
    display:flex;
`;

const ToolButton = styled.span`
    background-color: #eee;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    height: 30px;
    width: 30px;
    box-sizing: border-box;
    margin-right: 4px;

    img {
      height: 18px;
      width: 18px;
    }

    &:hover {
      background-color: #dfdfdf;
    }

    &.active {
      background-color: #aaa;
    }
    &.active:hover {
      background-color: #aaa;
    }

`;

const Title = styled.input`
  border: 1px none #000;
  height: 54px;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  font-size: 2rem;
  padding: 8px 0;
  font-weight: 600;
  box-sizing: border-box;
  

  &:focus, &:active, &:enabled {
    outline: none;
  }

`;

const StyledEditor = styled.div`
    flex-grow: 1;
    border-top: 1px solid #eee;
    line-height: 1.5;
    padding-top: 8px;
`;



class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.editorRef = createRef();


    const { data, id, } = this.props;

    const title = data.title;

    const content = JSON.parse(data.content);
    const editorState = (content) ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty();

    this.state = { editorState, title, };



    this.focus = () => this.editorRef.current.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.save = this._save.bind(this);

    this.changeTitle = (title) => {
      this.setState({ title });
      this.props.onTitleUpdateHandler(this.props.id, title)
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.id !== this.props.id) {

      //儲存前一次的內容
      if (prevState.editorState) {
        this.props.onSaveHandler(prevProps.id, this.getExportContent(prevState.editorState.getCurrentContent()))
      }

      const title = this.props.data.title;
      this.setState({ title, });

      const content = JSON.parse(this.props.data.content);
      const newContent = content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty();
      this.onChange(newContent);

    }
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  getExportContent(content) {
    content = content || this.state.editorState.getCurrentContent();
    const raw = convertToRaw(content);
    return raw;
  }

  _save() {
    const { onSaveHandler, id, } = this.props;
    onSaveHandler(id, this.getExportContent())
  }


  render() {
    const { onSaveHandler, data, id, } = this.props;
    const { editorState } = this.state;

    // console.log(id);


    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor ';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += 'RichEditor-hidePlaceholder ';
      }
    }

    return (
      <Container className='RichEditor-root'>

        <Title type='input' value={this.state.title} onChange={(e) => this.changeTitle(e.target.value)} />

        <ToolRow>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <ToolContainer>
            <ToolButton className='' onMouseDown={this.save}>
              <img src={`./icons/save.svg`} />
            </ToolButton>
          </ToolContainer>
        </ToolRow>

        <StyledEditor className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder='寫些東西...'
            ref={this.editorRef}
            spellCheck={true}
            id={this.props.id}
          />
        </StyledEditor>
      </Container>
    );
  }
}


const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    borderRadius: 4,
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'code-block': return 'code-block';
    default: return null;
  }
}

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    return (
      <ToolButton className={this.props.active ? 'active' : ''} onMouseDown={this.onToggle}>
        {this.props.icon && <img src={`./icons/${this.props.icon}`} />}
      </ToolButton>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', icon: 'type-h1.svg', },
  { label: 'H2', style: 'header-two', icon: 'type-h2.svg', },
  { label: 'H3', style: 'header-three', icon: 'type-h3.svg', },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote', icon: 'quote.svg', },
  { label: 'UL', style: 'unordered-list-item', icon: 'list-ul.svg', },
  { label: 'OL', style: 'ordered-list-item', icon: 'list-ol.svg', },
  { label: 'Code Block', style: 'code-block', icon: 'code-square.svg', },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ToolContainer>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </ToolContainer>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: 'type-bold.svg', },
  { label: 'Italic', style: 'ITALIC', icon: 'type-italic.svg', },
  { label: 'Underline', style: 'UNDERLINE', icon: 'type-underline.svg', },
  { label: 'Monospace', style: 'CODE', icon: 'code.svg', },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <ToolContainer>
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </ToolContainer>
  );
};

export default RichEditor;