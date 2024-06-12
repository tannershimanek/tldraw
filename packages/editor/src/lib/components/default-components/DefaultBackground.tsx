import { useValue } from '@tldraw/state'
import { useEditor } from '../../hooks/useEditor'

/** @public */
export function DefaultBackground() {
	const editor = useEditor()
	const currentCanvasColor = useValue('code', () => editor.user.getCanvasColor(), [editor])
	return (
		<div className="tl-background" style={{ backgroundColor: currentCanvasColor || '#f9fafb' }} />
	)
}
