Attribute VB_Name = "WordExcelPower"
Sub copyImagen()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add

Set slides = presentaciones.slides.Add(1, ppLayoutBlank)
    Range("C1").Copy
    With slides.Shapes.Paste ' cambia dimensiones a una imagen
        .Left = 12 * 28.35
        .Top = 3 * 28.35
        .Width = 28.35 * 10
        .Height = 28.35 * 8
     End With
End Sub
Sub usoShapeText()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add
Set slides = presentaciones.slides.Add(1, ppLayoutBlank)
    slides.Shapes.AddTextbox(Orientation:=msoTextOrientationHorizontal, _
    Left:=100, Top:=100, Width:=200, Height:=50).TextFrame. _
    TextRange.Text = "hello pu world" 'agregamos un shape con texto

End Sub
Sub usoppLayoutText()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add

Set slides = presentaciones.slides.Add(1, ppLayoutText) ' titulo y contenido de texto only
    With slides
        .Shapes(1).TextFrame.TextRange.Text = "Titulo De la presentacion "
        .Shapes(2).TextFrame.TextRange.Text = "Contenido del texto "
    End With
End Sub
Sub tituloYTable()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add
     
Set slides = presentaciones.slides.Add(1, ppLayoutBlank)

    With slides
        'Agregamos Titulo
        .Shapes.AddTextbox(Orientation:=msoTextOrientationHorizontal, _
        Left:=30, Top:=30, Width:=200, Height:=50).TextFrame.TextRange.Text = "titulo y objetos"
        
        'Agregamos Tabla
        Dim pptTabla As Object
        RowCount = 3
        ColumnCount = 3
        Set pptTabla = .Shapes.AddTable(RowCount, ColumnCount, 300, 300, 500, 200).table
        
        ' Llena la tabla con contenido
        For i = 1 To RowCount
            For j = 1 To ColumnCount
                pptTabla.Cell(i, j).Shape.TextFrame.TextRange.Text = "Celda " & i & "-" & j
            Next j
        Next i
        'Continuamos
        
    End With

Set ppt = Nothing
Set slides = Nothing
End Sub
Sub tituloYTable()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add
     
Set slides = presentaciones.slides.Add(1, ppLayoutBlank)

    With slides
        'Agregamos Titulo
        .Shapes.AddTextbox(Orientation:=msoTextOrientationHorizontal, _
        Left:=30, Top:=30, Width:=200, Height:=50).TextFrame.TextRange.Text = "titulo y objetos"
        
        'Agregamos Tabla
        Dim pptTabla As Object
        RowCount = 3
        ColumnCount = 3
        Set pptTabla = .Shapes.AddTable(RowCount, ColumnCount, 300, 300, 500, 200).table
        
        ' Llena la tabla con contenido
        For i = 1 To RowCount
            For j = 1 To ColumnCount
                pptTabla.Cell(i, j).Shape.TextFrame.TextRange.Text = "Celda " & i & "-" & j
            Next j
        Next i
        
        Range("B11:D16").Copy
        Set pptTabla = .Shapes.Paste.table
        pptTabla.ScaleProportionally ("3")
        Dim pptCell
        'modificamos fondo
'        For Each pptCell In pptTabla.Rows(1).Cells
'            pptCell.Shape.TextFrame.TextRange.Font.Name = "Times New Roman" 'cambiar fuente segun necesidades
'            pptCell.Shape.TextFrame.TextRange.Font.Size = 20
'            pptCell.Shape.TextFrame.TextRange.Font.Color = RGB(0, 255, 0) ' Verde
'        Next pptCell
'
'        For Each pptRow In pptTabla.ScaleProportionally("2")
'            pptRow.Shape.TextFrame.TextRange.Font.Size = 14
'        Next pptRow
        
        'Continuamos
        
    End With

Set ppt = Nothing
Set slides = Nothing
End Sub
Sub formaYTabla()
Dim xlapp As Excel.Application
Set xlapp = GetObject(, "Excel.Application")
Dim ppt As New PowerPoint.Application
Dim presentaciones As Presentation
Dim slides As Slide

ppt.Visible = True

Set presentaciones = ppt.Presentations.Add
Set slides = presentaciones.slides.Add(1, ppLayoutBlank)
    slides.Shapes.AddShape Type:=msoShapeRectangle, _
    Left:=0, Top:=0, Width:=100, Height:=200 'crea una autoforma
    slides.Shapes.AddTable 3, 4, 200, 300, 300, 200 'agrega una tabla
End Sub
