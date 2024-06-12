import { useEditor, useValue } from '@tldraw/editor'
import { useLayoutEffect } from 'react'
import { TldrawUiMenuCheckboxItem } from '../primitives/menus/TldrawUiMenuCheckboxItem'
import { TldrawUiMenuGroup } from '../primitives/menus/TldrawUiMenuGroup'
import { TldrawUiMenuSubmenu } from '../primitives/menus/TldrawUiMenuSubmenu'

/** @public */
export function CanvasColorMenu() {
	const editor = useEditor()
	const isDarkMode = useValue('isDarkMode', () => editor.user.getIsDarkMode(), [editor])
	const currentCanvasColor = useValue('code', () => editor.user.getCanvasColor(), [editor])

	const lightCanvasColors = [
		{ label: 'Default', code: '#f9fafb' },
		{ label: '1', code: '#f1f3f5' },
		{ label: '2', code: '#e4e6e9' },
		{ label: '3', code: '#D4D7DD' },
		{ label: '4', code: '#f3ece2' },
		{ label: '5', code: '#FAFCFF' },
	]

	const darkCanvasColors = [
		{ label: 'Default', code: '#101011' },
		{ label: '1', code: '#383B40' },
		{ label: '2', code: '#2D2F34' },
		{ label: '3', code: '#27292D' },
		{ label: '4', code: '#22272e' },
		{ label: '5', code: '#1c2128' },
	]

	// We only want to run this if the user changes their preference between dark and light mode.
	useLayoutEffect(() => {
		const isCurrentCanvasLight =
			darkCanvasColors.filter((el) => el.code == editor.user.getCanvasColor()).length === 0

		if (isDarkMode && isCurrentCanvasLight) {
			editor.user.updateUserPreferences({ canvasColor: darkCanvasColors[0].code })
		} else if (!isDarkMode && !isCurrentCanvasLight) {
			editor.user.updateUserPreferences({ canvasColor: lightCanvasColors[0].code })
		}
	}, [isDarkMode])

	const canvasColors = isDarkMode ? [...darkCanvasColors] : [...lightCanvasColors]

	// todo: we need to handle languages.
	return (
		<TldrawUiMenuSubmenu id="canvas-color-menu" label="Canvas color">
			<TldrawUiMenuGroup id="canvas-colors">
				{canvasColors.map(({ label, code }) => (
					<TldrawUiMenuCheckboxItem
						id={`canvas-color-${label}`}
						key={label}
						title={label}
						label={label}
						checked={code === currentCanvasColor}
						onSelect={() => {
							editor.user.updateUserPreferences({ canvasColor: code })
							console.log(editor.user.getCanvasColor())
						}}
					/>
				))}

				{/* {LANGUAGES.map(({ locale, label }) => (
					<TldrawUiMenuCheckboxItem
						id={`language-${locale}`}
						key={locale}
						title={locale}
						label={label}
						checked={locale === currentLanguage}
						onSelect={() => {
							editor.user.updateUserPreferences({ locale })
							trackEvent('change-language', { source: 'menu', locale })
						}}
					/>
				))} */}
			</TldrawUiMenuGroup>
		</TldrawUiMenuSubmenu>
	)
}
