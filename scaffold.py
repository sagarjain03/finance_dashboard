import os

target_structure = {
    'public': [],
    'src': {
        'assets': [],
        'components': {
            'ui': [],
            'charts': [],
            'layout': []
        },
        'features': {
            'dashboard': [
                'Dashboard.jsx',
                'SummaryCards.jsx',
                'BalanceChart.jsx',
                'CategoryChart.jsx'
            ],
            'transactions': [
                'Transactions.jsx',
                'TransactionTable.jsx',
                'TransactionForm.jsx',
                'filters.js'
            ],
            'insights': [
                'Insights.jsx',
                'insightsUtils.js'
            ],
            'roles': [
                'RoleSwitcher.jsx',
                'roleConfig.js'
            ]
        },
        'hooks': [
            'useTransactions.js',
            'useRole.js'
        ],
        'context': [
            'AppContext.jsx'
        ],
        'services': [
            'transactionService.js'
        ],
        'data': [
            'transactions.js',
            'summary.js'
        ],
        'utils': [
            'formatCurrency.js',
            'dateUtils.js'
        ],
        'constants': [
            'categories.js',
            'roles.js'
        ],
        'pages': [
            'DashboardPage.jsx',
            'TransactionsPage.jsx'
        ],
        'routes': [
            'AppRoutes.jsx'
        ],
        'App.jsx': None,
        'main.jsx': None,
        'index.css': None
    },
    '.gitignore': None,
    'package.json': None,
    'vite.config.js': None,
    'README.md': None
}

jsx_boilerplate = """function {ComponentName}() {{
  return <div>{ComponentName}</div>;
}}

export default {ComponentName};
"""

js_boilerplate = "export const sample = [];\n"

context_boilerplate = """import React, { createContext } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
}
"""

hooks_boilerplate = """export function {HookName}() {{
  return {{}};
}}
"""

services_boilerplate = """export const {ServiceName} = {{
  mockFetch() {{ return []; }}
}};
"""

css_boilerplate = "/* index.css */\n"
json_boilerplate = "{}\n"
ignore_boilerplate = "# .gitignore\nnode_modules\n"

created_folders = []
created_files = []

def create_structure(base_path, structure):
    if isinstance(structure, dict):
        for key, value in structure.items():
            path = os.path.join(base_path, key)
            if value is None:
                create_file(path)
            else:
                if not os.path.exists(path):
                    os.makedirs(path)
                    created_folders.append(path)
                create_structure(path, value)
    elif isinstance(structure, list):
        for item in structure:
            path = os.path.join(base_path, item)
            create_file(path)

def create_file(path):
    if os.path.exists(path):
        return
    
    content = ""
    filename = os.path.basename(path)
    
    if filename.endswith('.jsx'):
        if filename == 'AppContext.jsx':
            content = context_boilerplate
        elif filename in ['App.jsx', 'main.jsx']:
            component_name = filename.replace('.jsx', '').replace('-', '')
            content = jsx_boilerplate.format(ComponentName=component_name)
        else:
            component_name = filename.replace('.jsx', '').replace('-', '')
            content = jsx_boilerplate.format(ComponentName=component_name)
    elif filename.endswith('.js'):
        if filename.startswith('use'):
            content = hooks_boilerplate.format(HookName=filename.replace('.js', ''))
        elif 'service' in filename.lower():
            content = services_boilerplate.format(ServiceName=filename.replace('.js', ''))
        elif filename == 'vite.config.js':
            content = "export default {};\n"
        else:
            content = js_boilerplate
    elif filename.endswith('.css'):
        content = css_boilerplate
    elif filename.endswith('.json'):
        content = json_boilerplate
    elif filename == '.gitignore':
        content = ignore_boilerplate
    elif filename == 'README.md':
        content = "# Finance Dashboard\n"
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    created_files.append(path)

create_structure('.', target_structure)

print("CREATED_FOLDERS")
for f in created_folders:
    print(f)
print("CREATED_FILES")
for f in created_files:
    print(f)
