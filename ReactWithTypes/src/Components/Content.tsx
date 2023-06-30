import { CoursePart } from "../types"
import Part from "./Part"

const Content = ({ content }: { content: CoursePart[] }) => {
    return (
        <div>{content.map(kind =>
            <span key={kind.name}>{Part(kind)}</span>)}
        </div>
    )
}

export default Content