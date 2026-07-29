import React, { Fragment } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

type SanitizedContentProps = { content?: string | null };

const SanitizedContent: React.FC<SanitizedContentProps> = ({ content }) => <Fragment>{content && parse(DOMPurify.sanitize(content))}</Fragment>;

export default SanitizedContent;
