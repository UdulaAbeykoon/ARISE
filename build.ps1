# PowerShell script to build Next.js project with OneDrive compatibility

Write-Host "Starting build process..." -ForegroundColor Green

# Stop any running processes
Write-Host "Stopping any running processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean up build artifacts
Write-Host "Cleaning build artifacts..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Set environment variables
Write-Host "Setting environment variables..." -ForegroundColor Yellow
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:NODE_ENV = "production"

# Remove OneDrive file-on-demand attributes
Write-Host "Removing OneDrive attributes..." -ForegroundColor Yellow
attrib -U . /s /d 2>$null

# Set permissions
Write-Host "Setting directory permissions..." -ForegroundColor Yellow
icacls . /grant Everyone:F /t 2>$null

# Build the project
Write-Host "Building the project..." -ForegroundColor Green
try {
    npm run build
    Write-Host "Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Build failed: $_" -ForegroundColor Red
}
