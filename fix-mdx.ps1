$chaptersPath = "frontend\content\python-basic\chapters"
$files = Get-ChildItem -Path $chaptersPath -Filter "*.md"

$totalFiles = 0
$totalCodeBlocks = 0

foreach ($file in $files) {
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    $originalContent = $content
    $fileCodeBlocks = 0
    
    $backtick = [char]0x60
    
    # Pattern 1: CodeBlock with caption
    $pattern1 = "(?s)<CodeBlock\s+language=`"([^`"]+)`"\s+caption=`"([^`"]+)`">\s*\{$backtick(.*?)$backtick\}\s*</CodeBlock>"
    $matches1 = [regex]::Matches($content, $pattern1)
    foreach ($match in $matches1) {
        $lang = $match.Groups[1].Value
        $caption = $match.Groups[2].Value
        $code = $match.Groups[3].Value
        $replacement = "$backtick$backtick$backtick$lang`n# caption: $caption`n$code`n$backtick$backtick$backtick"
        $content = $content.Replace($match.Value, $replacement)
        $fileCodeBlocks++
    }
    
    # Pattern 2: CodeBlock without caption
    $pattern2 = "(?s)<CodeBlock\s+language=`"([^`"]+)`">\s*\{$backtick(.*?)$backtick\}\s*</CodeBlock>"
    $matches2 = [regex]::Matches($content, $pattern2)
    foreach ($match in $matches2) {
        $lang = $match.Groups[1].Value
        $code = $match.Groups[2].Value
        $replacement = "$backtick$backtick$backtick$lang`n$code`n$backtick$backtick$backtick"
        $content = $content.Replace($match.Value, $replacement)
        $fileCodeBlocks++
    }
    
    # Pattern 3: Fix LearningObjectives
    $pattern3 = '<LearningObjectives\s+objectives=\{frontmatter\.objectives\}\s*/>'
    $replacement3 = '<LearningObjectives />'
    $content = $content -replace $pattern3, $replacement3
    
    if ($content -ne $originalContent) {
        Set-Content -Path $filePath -Value $content -NoNewline
        $totalFiles++
        $totalCodeBlocks += $fileCodeBlocks
        Write-Host "Processed $($file.Name): $fileCodeBlocks CodeBlock(s) converted" -ForegroundColor Green
    } else {
        Write-Host "Skipped $($file.Name): No changes needed" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Summary:"
Write-Host "  Files modified: $totalFiles"
Write-Host "  CodeBlocks converted: $totalCodeBlocks"
