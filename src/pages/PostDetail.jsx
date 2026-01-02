import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../libs/client';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

import 'highlight.js/styles/github-dark.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)(:(.+))?/.exec(className || '');
    let lang = match && match[1] ? match[1] : '';
    const fileName = match && match[3] ? match[3] : '';

    // abbreviations
    const languageMap = {
        js: 'javascript',
        ts: 'typescript',
        py: 'python',
        rb: 'ruby',
        sh: 'bash',
        shell: 'bash',
    };
    if(languageMap[lang]) {
        lang = languageMap[lang];
    }

    return !inline && match ? (
        <div className="code-block-container">
            {/* display header-parts if it has filename */}
            {fileName && <div className="code-filename">{fileName}</div>}
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={lang}          // lnaguage
                PreTag="div"
                showLineNumbers={true}   // line number
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    ) : (
            // case of inline code (ex:`const a = 1`)
            <code className={className} {...props}>
                {children}
            </code>
        );
};

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        client.get({ endpoint: 'posts', contentId: id }).then((res) => setPost(res));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <article className="post-content">

            <h1>{post.title}</h1>

            <div className="category-list">
                {post.categories && post.categories.map((cat) => (
                    <span key={cat.id} className="category-tag">
                        {cat.name}
                    </span>
                ))}
            </div>

            <p className="date">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeHighlight, rehypeKatex]}
                components={{
                    code: CodeBlock,
                }}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default PostDetail;
